import React, { useEffect, useState } from "react"; 
import Footer from "../../component/guest/Footer"; 
import Header from "../../component/guest/Header"; 
import { Link } from "react-router-dom";



const HomePage = () => {
    const [books, setBooks] = useState([]); 
    const [searchKeyword, setSearchKeyword] = useState(""); 

    const [noResults, setNoResults] = useState(false); 

    const [onSearch, setOnSearch] = useState(false)


    const fetchBooks = async (keyword = "") => {
        const url = keyword ? `http://localhost:3005/api/books?keyword=${keyword}` : "http://localhost:3005/api/books";
        const booksRes = await fetch(url);
        const booksDataRes = await booksRes.json();
        
       
        const sortedBooks = booksDataRes.sort((a, b) => new Date(b.date) - new Date(a.date));
       
        const slicedBooks = sortedBooks.slice(0, 5);


        if (slicedBooks.length === 0) {
            setNoResults(true);
        } else {
            setBooks(slicedBooks);
            setNoResults(false);
        }
    };

    
    useEffect(() => {
        fetchBooks();
    }, []);

   
    const handleSearch = () => {
        fetchBooks(searchKeyword);
        setOnSearch(true)
    };

    
    const handleClearSearch = () => {
        setSearchKeyword("");
        fetchBooks(); 
    };

    return (
        <> 
            <Header />
            <div className="header">
                <div className="row1">
                    <h1>A room without books is like<strong> a body without a soul.</strong></h1>
                  
                </div>
            </div>    
            <div className="row2">
                <h2>Find Your Book</h2>
                <div className="search">
                    <input 
                        type="text" 
                        placeholder="Enter Your Book Name" 
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                 
                    <button onClick={handleSearch}>Search</button> 
                    <button onClick={handleClearSearch}>Clear</button> 
                </div>
            </div>
            
            <div>
                {noResults ? ( 
                    <h2>No Results</h2>
                ) : null} 
                   {!onSearch ? <h3>New Books</h3> : <h3>Les resultat</h3>}
                   
                {!noResults && (
                    <ul>
                       
                        {books.map(book => (
                            <li key={book.id}>
                                <img src={book.imageUrl} alt={book.title} />
                               
                                <h3>{book.title}</h3> 
                                <p>{book.author}</p> 
                               
                                <Link className="newbook-btn" to={`/book/details/${book.id}`}>See more</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Footer /> 
        </>
    );
}

export default HomePage; 

