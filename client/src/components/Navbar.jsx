import React, { useState, useEffect } from 'react';
import logo from '../images/booknook-logo.png';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Store');
    const [username, setUsername] = useState('');
    const userId = sessionStorage.getItem('userId');
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave= async ()=>{
        console.log("###########",username)
        const response = await axios.patch(`http://localhost:8085/user/${userId}`,username,{
            headers : {
                "Content-Type":"text/plain"
            }
        });
        console.log(response.body)
        setOpen(false)
    }
    const handleLogout = (e) => {
        e.stopPropagation();
        sessionStorage.removeItem('username');
        window.location.href = '/login';
    };

    const handleUsernameChange = async (e) => {
        e.stopPropagation();
        setUsername(e.target.value);
        console.log(username)
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
            initials += part.charAt(0);
        });
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: initials,
        };
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
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
                {username && (
                    <div className="dropdown" style={{ position: 'relative' }}>
                        <button className="navlink avatar-button" onClick={toggleDropdown}>
                            <Avatar name={username} style={{ backgroundColor: stringToColor(username) }} {...stringAvatar(username)} />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: '-50px' }}>
                                <button className="dropdown-item" onClick={handleClickOpen}>Profile</button>
                                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                        Edit Username
                                        <IconButton aria-label="close" onClick={handleClose}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </DialogTitle>
                                    <DialogContent dividers>
                                        <Typography gutterBottom>
                                            <div className="inputContainer">
                                                <input placeholder="Username" id="username" className="inputField" type="text" onChange={handleUsernameChange} />
                                            </div>
                                        </Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button style={{ color: '#CE9DFF' }} autoFocus onClick={handleSave}>
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
