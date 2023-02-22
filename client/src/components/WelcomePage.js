import React, {useState, useEffect} from 'react'
import {getCookie, setCookie } from '../misc/cookies';
import jwt_decode from "jwt-decode";

import { useNavigate } from 'react-router-dom';

var first = true;
function WelcomePage() {

  const [text, setText] = useState("Welcome, guest !");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  

    useEffect(() => {   
      if(first)
      {
        let token = getCookie('token');
        console.log("Token:", token);
        if(token != null)
        {
          let decoded = jwt_decode(token);
          setText("Welcome, " + decoded.username);
          setLogged(true);
        }
      }
        // console.log("Cookies: ", );
    })

    const loginButton = arg => {
      navigate("/login");
    }
    
    const registerButton = arg => {
      navigate("/register");
    }


  return (
    <div>
      <h3 className="mx-auto"> {text} </h3>
      <div className="container row">
          {
            !logged && <>
              <div className="col-5">
                <button type="button" className="btn btn-primary m-2 " onClick={loginButton}> Log in</button>
              </div>
            <div className="col-3"></div>

            <div className="col-4">
              <button type="button" className="btn btn-primary m-2 " onClick={registerButton}> Register</button>

            </div>
            </>
          }
          {
          logged &&
            <>
              <button type="button" className="btn btn-primary m-2 col-8 mx-auto">Log out</button>
            </>
          }
          


      </div>
    </div>
  )
}

export default WelcomePage