import { Link } from "react-router-dom";
import './NavBarr.css'


function NavBar(){
    return(
        <nav>
            <ul dir = "rtl">
                <li>
                    <Link to= "/login">Login</Link>
                </li>
                <li>
                    <Link to= "/register">Register</Link>
                </li>
                <li className="homeLogo">
                    <Link to= "/">MediClinic</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;