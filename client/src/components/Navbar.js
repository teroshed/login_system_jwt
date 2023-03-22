import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = (props) => {



  return (

    <nav className="navbar ">
        123
      <div className="navbar-left">
        <div> 123 </div>
        {/* <Link to="/" className="navbar-title">My App</Link> */}
        {/* <Link to="/vacations" className="navbar-link">Vacations</Link> */}
      </div>
      <div className="navbar-right">
        {props.isLoggedIn ? (
          <span className="welcome-message">Welcome, {props.name}!</span>
        ) : (
          <button className="login-button">Log In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;