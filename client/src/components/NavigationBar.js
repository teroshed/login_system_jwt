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
        // cookies.deleteCookie("token");
        let token = cookies.getCookie('token');
        if(token)
        {
            setTokenData(jwtDecode(token).tokenData);
        }
    }, [])
    function homeButton() { 

    }

    function logout()
    {
        setTokenData(null);
        cookies.deleteCookie("token");
        navigate('/login')
    }
    
    return (
        <nav id="navbar" className="d-flex">
            <div className="navbar-left col-6 d-flex">
                <div className='col-2'>
                    <button onClick={() => {navigate("/")}} type="button" className="navbutton w-100"> Home </button>
                </div>
                <div className='col-3'>
                    <button onClick={() => {navigate("/vacations")}} type="button" className="w-100 navbutton"> Vacations </button>

                </div>
                <div>
                    <button type="button" className="w-100 navbutton"> About </button>

                </div>
                
            </div>
            
            <div className="navbar-right d-flex justify-content-end w-100">
     
                {tokenData && <button type="button" onClick={() => logout()} className="navbutton"> Hey {tokenData.name + " " + tokenData.last_name} ! Log out </button>}
            </div>
        </nav>
    )
}

export default NavigationBar