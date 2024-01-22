import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

function BooksPage(){

    const [Books , setBooks] = useState([]);

    useEffect(()=>{
        (async()=>{
            const booksRes = await fetch("http://localhost:3005/api/books")

            const booksDataRes = await booksRes.json();

            setBooks(booksDataRes)
        })();
    },[])

    const handleDeleteBook = async(bookId , bookName) => {
        const token = localStorage.getItem('jwt')
    const adminConfirm = window.confirm(`are you sure that you wanna delete this Book ( ${bookName} ) ?`)
    if(adminConfirm){

      try {
        const response = await fetch(`http://localhost:3005/api/books/${bookId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
            alert('Book is deleted!')
        } else {
          console.error('Failed to delete the book.');
        }
      } catch (error) {
        console.error('Error occurred during delete deletion:', error);
      }

    }

    
    
    }


  //   const handleUpdateBook = async(bookId , bookName) => {
  //     const token = localStorage.getItem('jwt')
  // const adminConfirm = window.confirm(`are you sure that you wanna Update this Book ( ${bookName} ) ?`)
  // if(adminConfirm){

  //   try {
  //     const response = await fetch(`http://localhost:3005/api/books/${bookId}`, {
  //       method: 'PUT',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //         alert('Book is updated !')
  //     } else {
  //       console.error('Failed to update the book.');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred during update deletion:', error);
  //   }

  // }

  
  
  // }

    return (
        <>
        <Header />
        <div className="allBooks">
            {Books.map((book)=>{
          return(
                <div className="eachBook" key={book.id}>
                    <Link to={`/Book/${book.id}`} >
                    <div><img src={book.imageUrl} alt={book.title} /></div>
                    </Link>
                    <p>{book.title}</p>
                    <button onClick={()=>handleDeleteBook(book.id,book.title)}>Delete</button>
                </div>
            );
            })}
        </div>

        </>
    )
}
export default BooksPage;