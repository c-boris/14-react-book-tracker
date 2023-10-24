import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../App.css';
import SearchBar from './SearchBar';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '',
    filterFavorites: false,
    filterRead: false,
  });

  useEffect(() => {
    fetch('/books.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.books)) {
          setBooks(data.books);
        }
      });
  }, []);

  const handleSearch = (query) => {
    setFilters({ ...filters, searchQuery: query });
  };

  const handleFilterFavorites = (isChecked) => {
    setFilters({ ...filters, filterFavorites: isChecked });
  };

  const handleFilterRead = (isChecked) => {
    setFilters({ ...filters, filterRead: isChecked });
  };

  const toggleBookProperty = (isbn, propertyName) => {
    const updatedBooks = books.map((book) => {
      if (book.isbn === isbn) {
        return { ...book, [propertyName]: !book[propertyName] };
      }
      return book;
    });
    setBooks(updatedBooks);
  };  

  const filteredBooks = Array.isArray(books)
  ? books.filter((book) => {
      const { searchQuery, filterFavorites, filterRead } = filters;
      const title = book.title.toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchTitle = title.includes(query);

      if (searchQuery.trim() === '') {
        if (filterFavorites && filterRead) {
          return book.isFav || book.read;
        } else if (filterFavorites) {
          return book.isFav;
        } else if (filterRead) {
          return book.read;
        } else {
          return true;
        }
      }

      if (filterFavorites && filterRead) {
        return matchTitle && (book.isFav || book.read);
      } else if (filterFavorites) {
        return matchTitle && book.isFav;
      } else if (filterRead) {
        return matchTitle && book.read;
      } else {
        return matchTitle;
      }
    })
  : [];

  return (
    <div className="container">
      <SearchBar
        onSearch={handleSearch}
        onFilterFavorites={handleFilterFavorites}
        onFilterRead={handleFilterRead}
      />
      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-md-3" key={book.isbn}>
            <div className="h-100 d-flex">
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant="top"
                  src={book.thumbnailUrl || '/src/assets/javascript.png'}
                  alt={book.title}
                  className="custom-img"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text className="limited-text">
                    {book.shortDescription}
                  </Card.Text>
                  <div className="mt-auto">
                    <button
                      className={`btn ${book.isFav ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => toggleBookProperty(book.isbn, 'isFav')}
                    >
                      {book.isFav ? 'Remove from favorites' : 'Add to favorites'}
                    </button>
                    <button
                      className={`btn ${book.read ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => toggleBookProperty(book.isbn, 'read')}
                    >
                      {book.read ? 'Remove from wish list' : 'Add to wish list'}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
