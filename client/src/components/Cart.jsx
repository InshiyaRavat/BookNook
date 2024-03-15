import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const Cart = () => {
  const [cart,setCart] = useState([]);
  const userId = sessionStorage.getItem('userId')

  async function fetchCart(){
    try{
      console.log(userId)
      const response = await axios.get(`http://localhost:8085/cart/${userId}`)
      console.log(response.data)
      setCart(response.data)
    }
    catch(error){
      console.error("could not get books from cart",error)
    }
  }
  async function handleDelete(id){
    try{
      const response = await axios.delete(`http://localhost:8085/book/${userId}/${id}`)
      console.log("from delete: ")
      console.log(response.data)
      fetchCart()
    }
    catch(error){
      console.error("could not delete from cart : ",error)
    }
  }
  useEffect(()=>{
    fetchCart()
  },[])
  return (
    <div>
      <Navbar/> 
      {cart.map((book)=>(
        <div key={book.id} className="mycard card mb-3">
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
                <button onClick={()=>handleDelete(book.id)} className='cartBtn'>remove from cart</button>
            </div>
          </div>
          </div>
      </div>
          ))}
    </div>
  )
}

export default Cart