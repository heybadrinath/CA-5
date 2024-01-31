import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

// Popup component to display book details
function Popup({ book, onClose }) {
  return (
    <div className="popup">
      <div className="flex">
        <div>
          {/* Close button in the popup */}
          <span className="popup-close" onClick={onClose}>
            <IoIosCloseCircle />
          </span>
          {/* Book thumbnail image */}
          <img src={book.imageLinks.thumbnail} alt={book.title} />
        </div>

        <div className="popup-content">
          {/* Book details */}
          <h2>{book.title}</h2>
          <p>{book.subtitle}</p>
          <p>Pages: {book.pageCount}</p>
          <p>
            <b>Authors: </b>
            {book.authors.map((ele) => {
              return <span key={ele}>{ele}, </span>;
            })}
          </p>

          {/* Link to shop for the book */}
          <a
            href={book.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Shop Now
          </a>
        </div>
      </div>
      <div>
        {/* Book description */}
        <p className="des">{book.description}</p>
      </div>
    </div>
  );
}

// Home component that fetches books and displays them
function Home() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((res) => setData(res.data.books))
      .catch((err) => console.error(err.message));
  }, []);

  // Filter books based on search input
  const filteredBooks = data.filter((book) =>
    book.title.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  // Open the popup for a selected book
  const openPopup = (book) => {
    setSelectedBook(book);
  };

  // Close the popup
  const closePopup = () => {
    setSelectedBook(null);
  };

  return (
    <>
      {/* Navigation bar */}
      <div className="nav">
        <span className="logo">Kalvium Books</span>

        {/* Search bar */}
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            {/* SVG for search icon */}
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          {/* Input for search */}
          <input
            className="input"
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Register button and question mark icon with tooltip */}
        <div className="registerDiv">
          <Link to="/register">
            <button className="btn-shine">
              <span>Register</span>
            </button>
          </Link>
          <div className="qq">
            <HiOutlineQuestionMarkCircle />
            <div className="hide">
              <span>Register For Better Performance and Features</span>
            </div>
          </div>
        </div>
      </div>

      {/* Display filtered books or not found message */}
      {filteredBooks.length > 0 ? (
        <div className="div">
          {filteredBooks.map((ele) => (
            <div className="books" key={ele.id} onClick={() => openPopup(ele)}>
              {/* Book thumbnail and title */}
              <img src={ele.imageLinks.thumbnail} alt={ele.title} />
              <p>{ele.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="notFound">
          {/* Not found image */}
          <img
            src="https://i.pinimg.com/originals/89/39/06/893906d9df7228cc36e1b3679a0d1dac.png"
            className="f0f"
          />
        </div>
      )}

      {/* Display the Popup component if a book is selected */}
      {selectedBook && <Popup book={selectedBook} onClose={closePopup} />}
    </>
  );
}

export default Home;
