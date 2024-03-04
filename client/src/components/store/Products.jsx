import React from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Products = () => {
    const location = useLocation()
    console.log(location.state)
    const {title,price,imageUrl,description,category,id}=location.state || {}
  return (
    <div>
        <h2>title: {title}</h2>    
        <p> price: {price}</p>
        <p>des: {description}</p>
        <p>category: {category}</p>
        <img src={imageUrl} alt={title} />
    </div>
  )
}

export default Products