import React, { useState, useEffect } from 'react';
import logo from '../images/booknook-logo.png';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Store');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        console.log(storedUsername)
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleClick = (e) => {
        setActiveTab(e.target.value);
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
    
    function stringAvatar(name) {
        const parts = name.split(' ');
        let initials = '';
    
        parts.forEach(part => {
            initials += part.charAt(1);
        });
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: initials,
        };
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid text-center">
                <a className="navbar-brand" href="/">
                    <img src={logo} width={110} height={40} alt="Booknook Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className={`nav-link ${activeTab === 'Store' ? 'active' : ''}`} value='Store' onClick={handleClick} aria-current="page" href="/store">Book Store</a>
                        <a className={`nav-link ${activeTab === 'Cart' ? 'active' : ''}`} value='Cart' onClick={handleClick} href="/cart">Cart</a>
                    </div>
                </div>
                {username && <Avatar style={{backgroundColor: stringToColor(username)}} {...stringAvatar(username)} />}
            </div>
        </nav>
    );
};

export default Navbar;
