import { Link } from "react-router-dom"
import './HeaderAdmin.scss'

const HeaderAdmin = () => {
    return (
        <header className="nav">
            <ul>
                <li><Link to="/"><img src="/images/user-solid.svg" alt="logo"/></Link></li>
                
                <li><Link to="/createbook">Create Book </Link></li>
                <li><Link to="/allbooks">Our Books</Link></li>
                <li><Link to="/users">Our Users</Link></li>
                <li><Link to="/login">Login</Link></li>
                
                <li><Link to="/profile"><img src="/images/user-solid.svg" alt="profile"/></Link></li>
                
                
                
            </ul>
        </header>

    )
}
export default HeaderAdmin;