import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useJwt} from 'react-jwt';


function LoginForm() 
{
    const [timeout, setTimeout] = useState();
    const [btnText, setText] = useState("Login");
    const [status, setStatus] = useState("Not logged");
    const [logged, setLogged] = useState(false);
    const [first, setFirst] = useState(true);
    const [username, setUsername] = useState();


    var iteration = 0;
    useEffect(() => {
        let date = new Date();
        let date2 = new Date(date.getTime() + 10*1000);
        // setCookie("testco", 120, 10);
        // console.log("Date: ", date);
        // console.log("Date: ", date2);

        // document.cookie = "testcock=11;expires=" + date2.toUTCString() + ";";
        // console.log("Date2: ", date2.toUTCString());
        if(first)
        {
            // document.cookie = `testcookie=120;expires=${date2.toUTCString}`
            console.log("GEt cookie: ", getCookie("test2"));
            setFirst(false);
            let token = getCookie("token");
            if(token != null)
            {
                // checkLogged()
                setLogged(true);
                setStatus("Logged in");
            }
            
            console.log("cookies:", document.cookie);
        }

        // console.log("date ", (new Date()));

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

        let token = getCookie("token");
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
            setCookie("token", 1, -1);
            setStatus("Expired token");
        }
        else
        {
            setUsername(ans.data.username);
        }
    }

    function getCookie(key)
    {
        console.log("getting cookie: " + key);
        let cookies = document.cookie;
        let cookiesArr = cookies.split("; ");
        for(const e of cookiesArr)
        {
            let cookie = e.split("=");
            let ckey = cookie[0];
            let value = cookie[1];
            if(ckey == key)
                return value;
        }

        return null;
    }

    function setCookie(key, value, expiresInSeconds)
    {
        let str =`${key}=${value};`;
        if(expiresInSeconds)
            str += `max-age=${expiresInSeconds}`;
        document.cookie = str;
    }

    async function logButton() 
    {
        let username = await document.getElementById('userinput').value;
        let password = await document.getElementById('passinput').value;
        let res = await axios.post('http://localhost:3001/login', {username , password});
        res = res.data;
        console.log("Result: ", res);
        if(res.success)
        {
            setStatus("Logged in");
            setLogged(true);
            setCookie("token", res.token, 1800);
            setStatusClass("text-success");
        }
        else
        {
            setStatusClass("text-danger");
            setStatus("Wrong password or username ");
        }


    }

    function logoutButton() {
        // console.log("Logout")
        setCookie("token", "1", -1);
        setCookie("username", "1", -1);
        setStatus("Logged out");
        setLogged(false);
        

    }

    return (
    <div>
        <div className="p-4">
            {
                logged && 
                <div className="border box">
                    <h3> 
                        Hey !
                    </h3>
                </div>
            }
            {
                !logged && 
                    <>
                        <input type="text" id="userinput" className="form-control my-2" placeholder="username"/>
                        <input type="text" id="passinput" className="form-control my-2" placeholder="password"/>
                        <button type="button" onClick={logButton} className="btn btn-primary m-2"> {btnText} </button>
                    </>
            }
            {
                logged &&
                    <>
                        <button type="button" onClick={logoutButton} className="btn btn-primary m-2"> Log out </button>
                        <button type="button" onClick={() => checkLogged()} className="btn btn-primary m-2"> check Logged</button>
                    </>
            }
            

        </div>
        
        <div> Status: <span className="" id="status">{status} </span></div>
    </div>

  )
}

export default LoginForm