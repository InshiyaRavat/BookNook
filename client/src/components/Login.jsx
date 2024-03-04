import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const initialInfo={
    name:'',
    email:'',
    password:''
}
const Login = () => {
    const [userInfo,setUserInfo]=useState(initialInfo)
    const navigate = useNavigate()

    function handleChange(e){
        setUserInfo((userInfo)=>({
            ...userInfo,[e.target.name]: e.target.value,
        }));
    }
    async function handleSignIn(e){
        e.preventDefault();
        console.log(userInfo)
        try {
            const response = await axios.post('http://localhost:8085/authenticate', userInfo)
            console.log(response.data)
            navigate('/store')
        } catch (error) {
            console.error('Authentication failed:', error)
        }
    }
    async function handleSingUp(e){
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8085/addUser', userInfo)
            console.log(response.data); 
        } catch (error) {
            console.error('User registration failed:', error.response.data)
        }
    }
  return (
    <div className='bg-login'>
    <div class="wrapper">
        <div class="card-switch">
            <label class="switch">
               <input class="toggle" type="checkbox"/>
               <span class="slider"></span>
               <span class="card-side"></span>
               <div class="flip-card__inner">
                    <div class="flip-card__front">
                     <div class="title">Log in</div>
                     <form action="" class="flip-card__form">
                        <input type="email" placeholder="Email" name="email" value={userInfo.email} onChange={handleChange} class="flip-card__input"/>
                        <input type="password" placeholder="Password" value={userInfo.password} name="password" onChange={handleChange} class="flip-card__input"/>
                        <button class="flip-card__btn" onClick={handleSignIn}>Let`s go!</button>
                     </form>
                    </div>
                    <div class="flip-card__back">
                        <div class="title">Sign up</div>
                        <form action="" class="flip-card__form">
                            <input type="name" placeholder="Name" value={userInfo.name} onChange={handleChange} name="name" class="flip-card__input"/>
                            <input type="email" placeholder="Email" value={userInfo.email} onChange={handleChange} name="email" class="flip-card__input"/>
                            <input type="password" placeholder="Password" value={userInfo.password} onChange={handleChange} name="password" class="flip-card__input"/>
                            <button onClick={handleSingUp} class="flip-card__btn">Confirm!</button>
                        </form>
                    </div>
               </div>
            </label>
        </div>   
   </div>
   </div>
  )
}

export default Login