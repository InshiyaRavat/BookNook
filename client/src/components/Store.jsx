import React, { useEffect, useState } from 'react'
import Loading from "../components/Loading"

const Store = () => {

  const [books, setBooks] = useState([]);
  let listOfAllBooks =[];
  const book_categories = [
      "Mystery",
      "Science Fiction",
      "Fantasy",
      "Romance",
      "Historical Fiction",
      "Horror",
      "Thriller",
      "Biography",
      "Autobiography",
      "Memoir",
      "Self-Help",
      "History",
      "Science",
      "Technology",
      "Travel",
      "True Crime",
      "Picture Books",
      "Middle-Grade",
      "Young Adult",
      "Dictionaries",
      "Encyclopedias",
      "Atlases",
      "Poetry",
      "Drama",
      "Comics",
      "Religion",
      "Cookbooks",
      "Art",
      "Photography",
      "Science Fiction & Fantasy",
      "Health and Wellness",
      "Business",
      "Finance",
      "Education",
      "Travel",
      "Philosophy",
      "Sports and Recreation",
      "Humor",
      "Classics",
      "Romance"
  ]
  
  useEffect(() => {
    console.log('Fetching data from API...');
    const apiKey = 'AIzaSyAdXB_W18ty05smiN_l-tMkxzPXK9Nh8rk';

    book_categories.forEach((category) => {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${category}&key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => {
          console.log('API Response Status:', response.status);
          return response.json();
        })
        .then((data) => {
          console.log('API Response Data:', data);
          const fetchedBooks = data.items.map((item) => {
            const bookInfo = item.volumeInfo;
            const maxDescriptionLength = 400;
            const truncatedDescription = bookInfo.description
              ? bookInfo.description.slice(0, maxDescriptionLength) + '...'
              : 'No description available';
            const imageUrl = bookInfo.imageLinks?.thumbnail || 'fallbackImageUrl';
            return {
              title: bookInfo.title,
              price: '129.4',
              imageUrl: imageUrl,
              description: truncatedDescription,
            };
          });
          console.log('Fetched Books:', fetchedBooks);
          listOfAllBooks = [...listOfAllBooks, ...fetchedBooks];
          setBooks(listOfAllBooks);
        })
        .catch((error) => console.error('Error fetching data:', error));
    });
  }, []);
    
      
  
  return (
    <div>
      {books.length === 0 ? (
        <Loading />
      ) : (
        <div class="row g-4">
          {books.map((book, index) => (
            <div key={index} class="mycard card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src={book.imageUrl} class="imgCard card-img-top" alt={book.title}  style={{ maxWidth: '100px !important', height: '200px !important' }}/>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="mycardtitle card-title">{book.title}</h5>
                    <p class="cardsubtitle card-text">{book.description}</p>
                    <small class="cardprice text-body-secondary">
                    <span>$</span> {book.price}
                </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}  

export default Store