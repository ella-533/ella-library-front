import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { Link } from "react-router-dom";


const AllBooks = () => {
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
  

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(`http://localhost:3005/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the book");
      }

      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <HeaderAdmin />
      <h1>Liste des livres :</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {books ? (
        <>
          {books.map((book) => (
            <article key={book.id}>
              <img src ={book.imageUrl} alt={book.title} />
              <h2>{book.title}</h2>
              <p>Author : {book.author} </p>
              <Link to={`/updatebook/${book.id}`}>
                <button>Modifier</button>
              </Link>
              <button onClick={() => handleDelete(book.id)}>Supprimer</button>
              
            </article>
          ))}
        </>
      ) : (
        <p>En cours de chargement...</p>
      )}
    </>
  );
};

export default AllBooks;