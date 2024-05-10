import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const Cart = () => {
  const [cart,setCart] = useState([]);
  const userId = sessionStorage.getItem('userId')
  let totalPrice = 0;

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
      const response = await axios.delete(`http://localhost:8085/cart/${userId}/${id}`)
      console.log("from delete: ")
      console.log(response.data)
      fetchCart()
    }
    catch(error){
      console.error("could not delete from cart : ",error)
    }
  }

  const paymentStart=()=>{
    totalPrice = cart.reduce((total, book) => total + parseInt(book.price), 0)
    console.log(totalPrice)
    if(totalPrice == '' || totalPrice == null){
      alert("Nothing in cart.")
      return;
    }

    $.ajax(
      {
        url : 'http://localhost:8085/cart/order',
        data : JSON.stringify({totalPrice : totalPrice}),
        contentType : 'application/json',
        type : 'POST',
        dataType : 'json',
        success : function(response){
          console.log(response)
          if(response.status == 'created'){
            let options = {
              key : 'KEY',
              amount : response.amount,
              currency : 'INR',
              name : 'BookNook',
              description : 'checkout payment',
              image : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTdxn-IBUIfTtxXt46H1Dy_jbgJQavYxacKPkfSeonwaljKVEJC',
              order_id : response.id,
              handler : function(response){
                console.log(response.razorpay_payment_id)
                console.log(response.razorpay_order_id)
                console.log(responserazorpay_signature)
                alert("payemnt successful")
              },
              prefill:
              {
                "name" : "user",
                "email": "user@example.com",
                "contact": +919900000000,
              },
              notes : {
                address  : "BookNook"
              },
              theme : {
                color : "EF8354"
              }
            }

            let rzp = new Razorpay(options);

            rzp.on("payment.failed" , function(response){
              console.log(response.error.code)
              console.log(response.error.description)
              console.log(response.error.source)
              console.log(response.error.step)
              console.log(response.error.reason)
              console.log(response.error.metadata.order_id)
              console.log(response.error.metadata.paymeny_id)
              alert("payment failed. Please try again!")
            })

            rzp.open()
          }
        },
        error : function(error){
          console.log(error)
          alert("Something went wrong. Please Try again!")
        }
      }
    )
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
                  <span>₹</span> {book.price}
                </small>
                <button onClick={()=>handleDelete(book.id)} className='cartBtn'>remove from cart</button>
            </div>
          </div>
          </div>
      </div>
          ))}
      {cart.length > 0 && (
        <div className="total-price">
          <div className='text'>Total Price:</div>
          <div className='price'> ₹{cart.reduce((total, book) => total + parseInt(book.price), 0)}</div>
        </div>
      )}
      
      <div style={{display:'flex'}}>
        <p style={{flex:'1'}}>proceed with payment</p>
        <button style={{flex:'1'}} onClick={paymentStart} className='cartBtn'>Checkout</button>
      </div>
    </div>
  )
}

export default Cart