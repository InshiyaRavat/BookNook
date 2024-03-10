import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const Cart = () => {
  const [cart,setCart] = useState([]);
  async function fetchCart(){
    try{
      const userId = sessionStorage.getItem('userId')
      console.log(userId)
      const response = await axios.get(`http://localhost:8085/cart/${userId}`)
      console.log(response.data)
      setCart(response.data)
    }
    catch(error){
      console.error("could not get books from cart",error)
    }
  }

  useEffect(()=>{
    fetchCart()
  },[])
  return (
    <div>
      <Navbar/> 
      {cart.map((book)=>(
        <div className="mycard card mb-3">
        <div className="row g-0" key={book.id}>
          <div className="col-md-4">
            <img src="" alt={book.title} style={{ maxWidth: '100px !important', height: '200px !important' }} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="mycardtitle card-title">{book.title}</h5>
                <p className="cardsubtitle card-text">{book.description}</p>
                  <small className="cardprice text-body-secondary">
                      <span>$</span> {book.price}
                  </small>
            </div>
          </div>
          </div>
      </div>
          ))}
    </div>
  )
}

export default Cart