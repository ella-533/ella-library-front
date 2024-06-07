import { Link, useNavigate } from "react-router-dom";
import './Header.scss';

const Header = () => {
    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
        console.log(token)
    };

    return (
        <header className="nav">
            <ul>
                <li><Link to="/"><img src="/images/user-solid.svg" alt="logo"/></Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">All Books</Link></li>
                <li><Link to="/about">About Us</Link></li>
                {
                    token ? (
                        <>
                                                        <li><Link to="/favorite">Mes Favorites</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>

                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )
                }
                <li><Link to="/profile"><img src="/images/user-solid.svg" alt="profile"/></Link></li>
            </ul>
        </header>
    );
};

export default Header;