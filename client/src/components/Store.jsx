import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const Store = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'AIzaSyAdXB_W18ty05smiN_l-tMkxzPXK9Nh8rk';

  useEffect(() => {
    fetchBooksFromCategories();
  }, []);
  
  const fetchBooksFromCategories = async () => {
    setLoading(true);
    const book_categories = [
      "Poetry", "Science Fiction", "Fantasy", "Romance", "Historical Fiction",
      "Horror", "Thriller", "Biography", "Autobiography", "Memoir", "Self-Help",
      "History", "Science", "Technology", "Travel", "True Crime", "Picture Books",
      "Middle-Grade", "Young Adult", "Dictionaries", "Encyclopedias", "Atlases",
      "Mystery", "Drama", "Comics", "Religion", "Cookbooks", "Art", "Photography",
      "Science Fiction & Fantasy", "Health and Wellness", "Business", "Finance",
      "Education", "Travel", "Philosophy", "Sports and Recreation", "Humor",
      "Classics", "Romance"
    ];

    const fetchedBooks = [];
    for (const category of book_categories) {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${category}&key=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const categoryBooks = data.items.map((item) => ({
          title: item.volumeInfo.title,
          price: '129.4',
          imageUrl: item.volumeInfo.imageLinks?.thumbnail || 'fallbackImageUrl',
          description: item.volumeInfo.description || 'No description available',
        }));
        fetchedBooks.push(...categoryBooks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    setBooks(fetchedBooks);
    setLoading(false);
  };

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const fetchedBooks = data.items.map((item) => ({
        title: item.volumeInfo.title,
        price: '129.4',
        imageUrl: item.volumeInfo.imageLinks?.thumbnail || 'fallbackImageUrl',
        description: item.volumeInfo.description || 'No description available',
      }));
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(search);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="row g-4">
          <form onSubmit={handleSubmit} className="d-flex justify-content-end" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          {books.map((book, index) => (
            <div key={index} className="mycard card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={book.imageUrl} className="imgCard card-img-top" alt={book.title} style={{ maxWidth: '100px !important', height: '200px !important' }} />
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
      )}
    </div>
  );
};

export default Store;
