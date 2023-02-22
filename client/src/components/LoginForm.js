import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useJwt} from 'react-jwt';
import {verifyToken, logIn} from '../misc/loginUtils'
import jwtDecode from 'jwt-decode';
import cookies from '../misc/cookies.js';
import { useNavigate } from 'react-router-dom';


function LoginForm() 
{
    const [timeout, setTimeout] = useState();
    const [btnText, setText] = useState("Login");
    const [status, setStatus] = useState("Not logged");
    const [logged, setLogged] = useState(false);
    const [first, setFirst] = useState(true);
    const [username, setUsername] = useState();
    const navigate = useNavigate();



    var iteration = 0;
    useEffect(() => {
        let date = new Date();
        let date2 = new Date(date.getTime() + 10*1000);

        if(first)
        {
            // cookies.clearCookies();;
            // cookies.setCookie("testCookie" + Math.random(), 123+Math.random()*10);
            setFirst(false);
            let token = cookies.getCookie("token");
            if(token != null)
            {
                verifyToken(ans => {
                    if(ans.ok)
                    {
                        navigate("/");
                    }

                    
                })
                
            }
            
            console.log("cookies:", document.cookie);
        }


    });

    function setStatusClass(name)
    {
        let stat =  document.getElementById('status');
        stat.classList.remove("text-danger");
        stat.classList.remove("text-success");
        stat.classList.add(name);

    }
    async function checkLogged(callback)
    {

        let token = cookies.getCookie("token");
        console.log("checklogged: '" + token + "'");
        if(!token)
        {
            console.log("No token");
            return;
        }
        let ans = await axios.post("http://localhost:3001/checklogin", {token});
        console.log("answer of checklogged: ", ans.data);
        if(ans.data.username == false)
        {
            cookies.setCookie("token", 1, -1);
            setStatus("Expired token");
        }
        else
        {
            setUsername(ans.data.username);
        }
    }

    async function logButton() 
    {
        let username = await document.getElementById('userinput').value;
        let password = await document.getElementById('passinput').value;
        logIn({username, password}, ans => {
            console.log("Log ans: ", ans)
            if(ans.success)
            {
                let decoded = jwtDecode(ans.token);
                cookies.setCookie("token", ans.token);
            }
            else
            {
                setStatusClass("text-danger");
                setStatus("Login and Password doesn't match");
            }
            // let decoded = jwtDecode(ans.token);
            // let date1 = new Date();
            // let date2 = new Date(decoded.exp);
            // console.log("date1:", date1, ", date2:", date2);
            // console.log("decoded: ", jwtDecode(ans.token));;

        }) 
        return;
        let res = await axios.post('http://localhost:3001/login', {username , password});
        res = res.data;
        console.log("Result: ", res);
        if(res.success)
        {
            setStatus("Logged in");
            setLogged(true);
            cookies.setCookie("token", res.token, 1800);
            setStatusClass("text-success");
        }
        else
        {
            setStatusClass("text-danger");
            setStatus("Wrong password or username ");
        }
    }


    return (
    <div>
        <div className="p-4">

        <label htmlFor="userinput" className="d-flex "> Username:</label>

        <input tabIndex="1" type="text" id="userinput" className="form-control mb-2" placeholder="Username"/>
        <label htmlFor="passinput" className="d-flex"> Password:</label>
        <input tabIndex="2" type="text" id="passinput" className="form-control mb-2" placeholder="Password"/>
        <div className="">
            <a href="/register" className="link-primary float-end"> Register </a>

            <button tabIndex="3" type="button" onClick={logButton} className="btn btn-primary  d-flex "> {btnText} </button>

        </div>
        

        </div>
        
        <div><span className="" id="status">{status} </span></div>
    </div>

  )
}

export default LoginForm