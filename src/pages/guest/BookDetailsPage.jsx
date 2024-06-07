import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const token = localStorage.getItem("jwt");
  const [editCommentStates, setEditCommentStates] = useState([]);
  const [favoriteExists, setFavoritesExists] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null); // Ajout de l'état pour stocker l'ID du favori

  const fetchBookDetails = async () => {
    try {
      const bookResponse = await fetch("http://localhost:3005/api/books/" + id);
      if (!bookResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const bookData = await bookResponse.json();
      setBook(bookData.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchFavoriteExists = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/favorites/favorite?userid=${userId}&bookid=${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFavoritesExists(data.length > 0);
      if (data.length > 0) {
        setFavoriteId(data[0].id); // Stocker l'ID du favori pour une suppression facile
      }

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBookDetails();
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setLoginUser(decodedToken);
      fetchFavoriteExists(decodedToken.data.userId);
    }
  }, []);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwt");
    const review = event.target.review.value;
    const userId = loginUser.data.userId;

    try {
      const response = await fetch("http://localhost:3005/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ BookId: id, content: review, UserId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      fetchBookDetails();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      const response = await fetch("http://localhost:3005/api/reviews/" + reviewId, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      fetchBookDetails();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReviewEdit = async (e, reviewId) => {
    e.preventDefault();
    const review = e.target.review.value;

    try {
      const response = await fetch("http://localhost:3005/api/reviews/" + reviewId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ content: review }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit review");
      }
      fetchBookDetails();
      toggleEditComment(reviewId);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleEditComment = (reviewId) => {
    setEditCommentStates((prevStates) => {
      if (prevStates.includes(reviewId)) {
        return prevStates.filter((id) => id !== reviewId);
      } else {
        return [...prevStates, reviewId];
      }
    });
  };

  const handleFavoriteAdd = async () => {
    const userId = loginUser.data.userId;
    try {
      const response = await fetch("http://localhost:3005/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ BookId: id, UserId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to favorite");
      }
      setFavoritesExists(true); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFavoriteDelete = async () => {
    const userId = loginUser.data.userId;
    try {
     
      const response = await fetch(`http://localhost:3005/api/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ BookId: id, UserId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove from favorite");
      }
      setFavoritesExists(false); 
      setFavoriteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {book ? (
        <div>
          <img src={book.imageUrl} alt={book.title} />
          <h1>{book.title}</h1>
          <p>Auteur: {book.author}</p>
          <p>Description: {book.description}</p>
          <p>Publication: {book.publication}</p>
          <p>Languege: {book.language}</p>
          <p>Prix: {book.price} $</p>

          <h2>Avis:</h2>
          {book && (
            <ul>
              {book.Reviews.map(review => (
                <li key={review.id}>
                  {review.User.username}: {review.content}
                  {loginUser && loginUser.data.userId === review.User.id && (
                    <>
                      <button onClick={() => handleReviewDelete(review.id)}>Supprimer</button>
                      <button onClick={() => toggleEditComment(review.id)}>Modifier</button>
                    </>
                  )}
                  {editCommentStates.includes(review.id) && (
                    <form onSubmit={(e) => handleReviewEdit(e, review.id)}>
                      <textarea name="review" defaultValue={review.content}></textarea>
                      <button type="submit">Envoyer</button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>En cours de chargement...</p>
      )}

      {loginUser && (
        favoriteExists ? (
          <button onClick={handleFavoriteDelete}>remove from favorite</button>
        ) : (
          <button onClick={handleFavoriteAdd}>Add to favorite</button>
        )
      )}

      <h2>Écrire un avis:</h2>
      <form onSubmit={handleReviewSubmit}>
        <textarea name="review" />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
};

export default BookDetailsPage;
