import React, { useState } from 'react'
import logo from '../images/booknook-logo.png'
import { Avatar } from '@mui/material'

const Navbar = () => {
    const [activeTab,setActiveTab] = useState('Store')

    const handleClick=(e)=>{
        setActiveTab(e.target.value)
    }
    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
  return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid text-center">
                <a class="navbar-brand" href="/"><img src={logo} width={110} height={40}/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class={`nav-link ${activeTab === 'Store' ? 'active' : ''}`} value='Store' onClick={handleClick} aria-current="page" href="/store">Book Store</a>
                    <a class={`nav-link ${activeTab === 'Rent' ? 'active' : ''}`} value='Rent' onClick={handleClick} href="/rent">Rent Books</a>
                    <a class={`nav-link ${activeTab === 'Cart' ? 'active' : ''}`} value='Cart' onClick={handleClick} href="/cart">Cart</a>
                </div>
                </div>
                <Avatar {...stringAvatar('Inshiya Ravat')} />
            </div>
        </nav>
  )
}

export default Navbar