    import React, { useState, useEffect } from 'react';
    import logo from '../images/booknook-logo.png';
    import Avatar from '@mui/material/Avatar';
    import { Navigate } from 'react-router-dom';
    import axios from 'axios'
    import Box from '@mui/material/Box';
    import Button from '@mui/material/Button';
    import Typography from '@mui/material/Typography';
    import Modal from '@mui/material/Modal';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const Navbar = () => {
        const [activeTab, setActiveTab] = useState('Store');
        const [username, setUsername] = useState('');
        const [showDropdown, setShowDropdown] = useState(false);
        const userId = sessionStorage.getItem('userId')
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

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

        const toggleDropdown = () => {
            setShowDropdown(!showDropdown);
        };

        const handleLogout = (e) => {
            e.stopPropagation();
            sessionStorage.removeItem('username');
            window.location.href = '/login';
        };

        const handleEditUsername = async (e) => {
            e.stopPropagation();
            const response = await axios.patch(`http://localhost:8085/user/${userId}`);
            console.log(response.body)
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
                    {username && 
                        <div className="dropdown" onClick={toggleDropdown}>
                            <Avatar style={{backgroundColor: stringToColor(username)}} {...stringAvatar(username)} />
                            {showDropdown && (
                                <div className='dropdownmenu'>
                                <ul>
                                    <li>
                                        <div>
                                            <Button onClick={handleOpen}>Edit Username</Button>
                                            <Modal
                                                open={open}
                                                // onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Enter new user name:
                                                </Typography>
                                                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onClick={(e) => e.stopPropagation()}/>
                                                <Button onClick={(e) => {handleEditUsername(e); handleClose();}}>update</Button>
                                                </Box>
                                            </Modal>
                                            </div>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </nav>
        );
    };

    export default Navbar;
