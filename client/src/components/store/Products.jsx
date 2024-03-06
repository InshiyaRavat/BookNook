import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar'

const Products = () => {
    const location = useLocation()
    console.log(location.state)
    const {title,price,imageUrl,description,category,id}=location.state || {}
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
            <Link to={'/cart'}><button className='prodBtn'>Add to cart</button></Link>
          </div>
      </div>
    </div>
  )
}

export default Products