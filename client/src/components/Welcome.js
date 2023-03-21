import React, {useState, useEffect} from 'react'
import cookies from '../misc/cookies';
import jwt_decode from "jwt-decode";
import { verifyToken } from '../misc/loginUtils';

import { useNavigate } from 'react-router-dom';

var first = true;
function WelcomePage() {

  const [text, setText] = useState("Welcome, guest !");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();


    useEffect(() => {   
      if(first)
      {
        console.log("cookies: ", document.cookie);
        
        let token = cookies.getCookie('token');
        console.log("Token:", token);
        if(token != null)
        {
          let decoded = jwt_decode(token);
          verifyToken(e => {
            if(e.ok)
            {
              let decoded = jwt_decode(token);
              if(decoded.exp < new Date().getTime())
              {
                console.log("Expired token");
              }
              setText("Welcome, " + decoded.username);
              setLogged(true);
            }
            else
            {
              console.log("Failed verify:", e);
            }
          });
          
        }
        // first = false;
      }
        // console.log("Cookies: ", );
    })

    const loginButton = arg => {
      navigate("/login");
    }
    
    const registerButton = arg => {
      navigate("/register");
    }

    const logOutButton = () => 
    {
      cookies.deleteCookie('token');
      setLogged(false);
      setText("Welcome, guest");
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
              <button onClick={logOutButton} type="button" className="btn btn-primary m-2 col-8 mx-auto">Log out</button>
            </>
          }
          


      </div>
    </div>
  )
}

export default WelcomePage