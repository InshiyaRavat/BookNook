import React from 'react'
import { Link } from 'react-router-dom'
import Banner from "../register/Banner"
// import axios from 'axios'
const Login = () => {
    return (
        <section id="register-page">

            <Banner/>

            <div className="right">
                <div className="register-card">
                    <h2>Log In</h2>
                    <form action="">
                        <div>
                            <input type="text" placeholder="Username"/>

                        </div>
                        <div>
                            <input type="password" placeholder="Password"/>

                        </div>
                        <div>
                            <input type="submit"/>
                        </div>
                    </form>
                    <div className="form-redirects">New here? Create an account
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login