import { Link } from "react-router-dom";
import './style/style.scss';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Header(){
    
    const [isUser , setIsUser] = useState(false);
    const [isAdmin , setIsAdmin] = useState('');
    const token = localStorage.getItem('jwt')
    console.log('header')
    console.log(jwtDecode(token).data)
    useEffect(()=>{
        if(token){
            setIsUser(true)
            setIsAdmin(jwtDecode(token).data.role)
        }
    },[token])

    const handleLogeOut = ()=>{
        localStorage.removeItem('jwt')
        window.location.reload();
    }
    console.log('header ')
 
    return(
        <header>
            <nav className="navbar">
                <ul className="ulNavBar">
                    <li><Link to={"/"} className="links">Home</Link></li>
                    {isUser ? (<li><button onClick={handleLogeOut}>Log Out</button></li>):(<li><Link to="/Login" >Login</Link></li>)}
                    {isAdmin === 2 && (<li><Link to="/Admin/Books" className="links">Books</Link></li>)}
                    {isAdmin === 1 && (<li><Link to="/Admin/Users" className="links">Users</Link></li>)}
                    <li><Link to={"/Contact"} className="links">Contact Us</Link></li>
                    {isAdmin === 2 && (<li><Link to = "/Admin/CreateBook" className="links">Create book </Link></li>)}
                </ul>
            </nav>
        </header>
    )
}
export default Header;