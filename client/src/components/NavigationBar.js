import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import cookies from '../misc/cookies';


var first = true;
function NavigationBar() {

    const navigate = useNavigate();
    const [tokenData, setTokenData] = useState();

    useEffect(() => {
        let token = cookies.getCookie('token');
        if(token)
        {
            console.log("token decoded: ", jwtDecode(token));
            setTokenData(token);
        }
        console.log("test useeffect navbar")
            // setTokenData(jwtDecode(token));
    }, [])
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
                <div className="col"> 

                </div>
            </div>
            
            <div className="navbar-right d-flex float-end">
                <button type="button" className="navbutton"> tf </button>
            </div>
        </nav>
    )
}

export default NavigationBar