import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import './style/HomePage/style.scss';
function EachBook() {
  const [book, setBook] = useState(null); // Initialize with null or an empty object
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const bookRes = await fetch(`http://localhost:3005/api/books/${id}`);
        const bookResData = await bookRes.json();
        setBook(bookResData);
      } catch (error) {
        console.error("Error fetching book:", error);
        // Handle errors, e.g., setBook(null) or show an error message
      }
    })();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>; // You can add a loading indicator while data is being fetched
  }

  return (
    <>
      <Header />
      <main>
        <div className="bookInfos">
          <div className="bookInfo">
            <div>
              <img className="imgOfBook" src={book.data.imageUrl} alt={book.data.title}/>
            </div>
            <div>
              <h3>{book.data.title}</h3>
            </div>
            <div>
              <p>Author : </p>
              <strong>{book.data.author}</strong>
            </div>
            <div>
              <p>Publication : </p>
              <strong>{book.data.publication}</strong>
            </div>
            <div>
              <p>Description : </p>
              <strong>{book.data.description}</strong>
            </div>
            <div>
              <p>Language : </p>
              <strong>{book.data.language}</strong>
            </div>
            <div>
              <p>Price : </p>
              <strong>{book.data.price}$</strong>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EachBook;
