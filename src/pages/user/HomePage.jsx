import { useEffect, useState } from "react";
import Header from "../../components/Header";
import './style/HomePage/style.scss';
import { Link } from "react-router-dom";
function HomePage(){
    const [Books , setBooks] = useState([]);

    useEffect(()=>{
        (async()=>{
            const booksRes = await fetch("http://localhost:3005/api/books")

            const booksDataRes = await booksRes.json();

            setBooks(booksDataRes)
        })();
    },[])


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
                        </div>
                    );
                })}
            </div>
        </>
    )
}
export default HomePage;