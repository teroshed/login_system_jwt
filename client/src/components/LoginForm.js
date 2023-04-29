import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useJwt} from 'react-jwt';
import {verifyToken, logIn} from '../misc/loginUtils'
import jwtDecode from 'jwt-decode';
import cookies from '../misc/cookies.js';
import { useNavigate } from 'react-router-dom';
import FormNavigation from './FormNavigation';
import FormWrapper from './FormWrapper';



function LoginForm(props) 
{
    const [timeout, setTimeout] = useState();
    const [btnText, setText] = useState("Login");
    const [status, setStatus] = useState("Not logged");
    const [logged, setLogged] = useState(false);
    const [first, setFirst] = useState(true);
    const [username, setUsername] = useState();
    const [mailLabel, setMailLabel] = useState(false);
    const [passwordLabel, setPassLabel] = useState(false);

    const navigate = useNavigate();



    var iteration = 0;
    useEffect(() => {
        let date = new Date();
        let date2 = new Date(date.getTime() + 10*1000);

        if(first)
        {

            setFirst(false);
            let token = cookies.getCookie("token");
            if(token != null)
            {
                verifyToken(ans => {
                    if(ans.ok)
                    {
                        navigate("/vacations");
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
        let email = document.getElementById('mailinput');
        let password = document.getElementById('passinput');
        let flag = true;
        if(email.value.replaceAll(" ", "") == "")
        {
            email.classList.add("required");
            setMailLabel(true);
            flag = false;
        }   
        if(password.value.replaceAll(" ", "") == "")
        {
            password.classList.add("required");

            setPassLabel(true);
            flag = false;
        }   

        if(!flag)
            return;

        logIn({email: email.value, password: password.value}, ans => {
            console.log("Log ans: ", ans)
            if(ans.success)
            {
                let decoded = jwtDecode(ans.token);
                console.log("decoded:", decoded);
                console.log("Time now:", Date.now());
                cookies.setCookie("token", ans.token, decoded.exp);
                
                navigate("/");
            }
            else
            {
                setStatusClass("text-danger");

                if(ans.code == 404)
                    setStatus("Server error");
                else if(ans.code == 401)
                    setStatus("Login and Password doesn't match");
            }
            // let decoded = jwtDecode(ans.token);
            // let date1 = new Date();
            // let date2 = new Date(decoded.exp);
            // console.log("date1:", date1, ", date2:", date2);
            // console.log("decoded: ", jwtDecode(ans.token));;

        }) 
        return;
    }


    return (
    <FormWrapper>
    
        <div className="p-4">
        
        <div className='row form-group '>
            <label htmlFor="mailinput" className="d-flex "> Email:</label>
            <input tabIndex="1" type="text" id="mailinput" className="form-control" placeholder="E-mail"/>
            {mailLabel && <label className='text-danger'> Please enter an email </label>}
        </div>
        
        <div className="row containerform-group my-2">
            <label htmlFor="passinput" className="d-flex"> Password:</label>
            <input tabIndex="2" type="password" id="passinput" className="form-control " placeholder="Password"/>
            {passwordLabel && <label className='text-danger'> Please enter a password </label>}

        </div>
        
        <div className="row d-flex justify-content-between">
            <button tabIndex="3" type="button" onClick={logButton} className="btn btn-primary col-4"> {btnText} </button>

            <a href="/register" className="link-primary col-4 "> Register </a>


        </div>
        

        </div>
        
        <div><span className="" id="status">{status} </span></div>
    </FormWrapper>

  )
}


export default LoginForm;