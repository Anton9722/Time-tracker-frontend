import { Link } from "react-router-dom";

function Navbar () {

    return(
        <div id="navbar">
            <img src="src\assets\images\logo.png" id="navbarLogo"></img>
            <ul>
                <li class="navbarLi" id="topNavbarLi">
                    <Link to="/" class="navbarLink">TIME TRACKER</Link>
                </li>
                <li class="navbarLi">
                    <Link to="/statistics" class="navbarLink">STATISTICS</Link>
                </li>
                <li class="navbarLi">
                    <Link to="/settings" class="navbarLink">SETTINGS</Link>
                </li>
                <li id="navbarLiLogout">
                    <a id="logoutLink">LOGOUT</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar