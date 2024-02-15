import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const Store = () => {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchBooks() {
    setLoading(true);
    try {
      let url = "http://localhost:3000/AllBooks";
      if (search !== '') {
        url = `http://localhost:3000/AllBooks?category=${search}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Books:', data);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchBooks(); 
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