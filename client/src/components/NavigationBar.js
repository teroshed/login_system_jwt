import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import { useNavigate } from 'react-router-dom';


function NavigationBar() {

    const navigate = useNavigate();

    function homeButton() { 

    }
    
    return (
        <nav id="navbar" className="pl-2">
            <div className="navbar-left col-6">
                <button type="button" className=" col-2 navbutton">
                    <span> 123</span>
                </button>
                <button onClick={() => {navigate("/")}} type="button" className=" col-2 navbutton"> Home </button>
                <button onClick={() => {navigate("/vacations")}} type="button" className=" col-2 navbutton"> Vacations </button>
                <button type="button" className=" col-2 navbutton"> About </button>
            </div>
            
            <div className="navbar-right float-end">
                <div  className='float-end'> 123 </div>
            </div>
        </nav>
    )
}

export default NavigationBar