import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import axios from 'axios'

const Products = () => {
    const location = useLocation()
    const navigate = useNavigate()
    console.log("state: ")
    console.log(location.state)
    const {title,price,imageUrl,description,category,id}=location.state || {}

    async function addToCart(e) {
      e.preventDefault();
      try {
        const uid = sessionStorage.getItem('userId')
        console.log(uid)
          const response = await axios.post(`http://localhost:8085/cart/${uid}`, title);
          console.log(response.data);
          localStorage.setItem("book",location.state)
          navigate('/cart');
      } catch (error) {
          console.error('Failed to add book to cart:', error);
          alert('Failed to add book to cart. Please try again later.');
      }
  }
  return (
    <div>
      <Navbar/>
        <div className='prodCard card'>
          <div className='prodImg card-img'>
            <img src={imageUrl} alt={title} />
          </div>
          <div className='prodBody card-body'>
            <h1 className='prodTitle'>{title}</h1> 
            <p>{description}</p>
            <div className='prodPriceAndCategory'>
              <p className='prodPrice'>${price}</p>
              <p className='prodCategory'>{category}</p>
            </div>
            <button onClick={addToCart} className='prodBtn'>Add to cart</button> 
          </div>
      </div>
    </div>
  )
}

export default Products