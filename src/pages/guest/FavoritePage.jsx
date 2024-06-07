import React, { useEffect, useState } from "react";
import Header from "../../component/guest/Header";
import {jwtDecode} from "jwt-decode";



const FavoritePage = () => {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);



  
  const fetchBooks = async () => {
    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);

    try {
    
      const response = await fetch(`http://localhost:3005/api/favorites?userid=${decodedToken.data.userId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  }

  const handleDelete = async (bookId) => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch(`http://localhost:3005/api/favorites/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete favorite');
      }
      fetchBooks();
      // Update state to remove the deleted book from the list
      //setBooks(books.filter(book => book.Book.id !== bookId));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {

    fetchBooks();
  }, [])
  return (
    <>
      <Header />
      <h1>Liste des favorites :</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {books ? (
        <>
          {books.map((book) => {
            // Vérifiez que book et book.Book existent et ne sont pas null
            if (!book || !book.Book) {
              return null; // Ignorez les entrées invalides
            }
            return (
              <article key={book.Book.id}>
                <img src={book.Book.imageUrl} alt={book.title} />
                <h2>{book.Book.title}</h2>
                <p>Author : {book.Book.author} </p>
                <button onClick={() => handleDelete(book.id)}>Supprimer des favoris</button>
              </article>
            );
          })}
        </>
      ) : (
        <p>En cours de chargement...</p>
      )}
    </>
  );
};

export default FavoritePage;

