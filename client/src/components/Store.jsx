import React, { useEffect, useState } from 'react'
import Loading from "../components/Loading"

const Store = () => {
  
  const apiKey = ''
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const apiKey = 'AIzaSyAdXB_W18ty05smiN_l-tMkxzPXK9Nh8rk'; 
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const fetchedBooks = data.items.map(item => {
          const bookInfo = item.volumeInfo;
          return {
            title: bookInfo.title,
            price: '129.4',
            imageUrl: bookInfo.imageLinks.thumbnail,
            description: bookInfo.description,
          };
        });

        setBooks(fetchedBooks);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {books.length === 0 ? (
        <Loading/>
      ) : (
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {books.map((book,index)=>(
          <div key={index}  class="mycard card mb-3">
              <div class="row g-0">
                  <div class="col-md-4">
                      <img src={book.imageUrl} class="card-img-top" alt={book.title}/>
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="mycardtitle card-title">{book.title}</h5>
                          <p class="cardsubtitle card-text">{book.description}</p>
                      </div>
                  </div>
              </div>
              <div class="card-footer">
                  <small class="cardprice text-body-secondary"><span>$</span>  {book.price}x</small>
              </div>
          </div>
           ))};
        </div> 
      )}
    </div>   
  )
}

export default Store