import React, { useEffect, useState } from "react";
import Header from "../../component/guest/Header";
import { Link } from "react-router-dom";

const BooksPage = () => {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
   // for bring the Data froom API
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/books");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      }
    };


    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <h1>Liste des livres :</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {books ? (
        <>
          {books.map((book) => (
            <article key={book.id}>
              <img src ={book.imageUrl} alt={book.title} />
              <h2>{book.title}</h2>
              <p>Author : {book.author} </p>
              
              <Link to={`/book/details/${book.id}`}>See more</Link>
            </article>
          ))}
        </>
      ) : (
        <p>En cours de chargement...</p>
      )}
    </>
  );
};

export default BooksPage;
