import React from 'react'
import logo from '../images/booknook-logo.png'

const Navbar = () => {
  return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid text-center">
                <a class="navbar-brand" href="/"><img src={logo} width={100} height={30}/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="#">Book Store</a>
                    <a class="nav-link" href="#">Your Books</a>
                    <a class="nav-link" href="#">Your Next Chapter</a>
                </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar