import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiPartyFlags } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2 className="logo">
          <NavLink to="/" className="kn">
            Café | Koncertek neked
            &nbsp;<GiPartyFlags />
          </NavLink>
        </h2>
        <div className="menu-icon" onClick={handleShowNavbar}>
          ☰
        </div>
        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">Kezdőlap</NavLink>
            </li>
            <li>
              <NavLink to="/new">Új koncert</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
