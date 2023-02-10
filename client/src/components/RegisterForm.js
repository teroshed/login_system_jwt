import React, {useState, useEffect} from 'react'
import axios from 'axios';


function RegisterForm() {
  const [emailLabel, setEmailLabel] = useState("Email is already registered");
  const [passwordLabel, setPasswordLabel] = useState(true);
  const [usernameLabel, setUsernameLabel] = useState(false);

  function registerBtn()
  {
    let email = document.getElementById("email").value;
    let password = document.getElementById("username").value;
    let username = document.getElementById("password").value;
    let name = document.getElementById("name").value;
    let lastname = document.getElementById("lastname").value;

    if(email && password && username)
    {
    
    }
    console.log(`register: email: ${email} password: ${password}, username: ${username}`);
  }

  function onEmailChange(e)
  {
    console.log(e.target.value);
  }

  function onUsernameChange(e)
  {
    console.log(e.target.value);
    
  }
  
  function onPasswordChange(e)
  {
    console.log(e.target.value);

  }
  // on
  
  return (
    <>
      <div className="p-4 border container "> 
        <h4> Register: </h4>
        <div className="">
          <input onChange={onEmailChange} type="text" id="email" className="form-control my-2" placeholder="E-mail"/>
          {emailLabel && <label  className="form-label d-flex text-danger mx-2 "> {emailLabel} </label>}
        </div>

        <div className="">
          <input onChange={onPasswordChange} type="text" id="password" className="form-control my-2" placeholder="Password"/> 
          {passwordLabel && <label  className="form-label d-flex text-danger mx-2 ">Password can't be empty</label>}
        </div>

        <div className="">
          <input onChange={onUsernameChange} id="username" type="text" className="form-control my-2" placeholder="Username"/>
          {usernameLabel && <label className="form-label d-flex text-danger mx-2 ">Username can't be empty</label>}
        </div> 
        

        <div className="row ">
          <div className="col-6">
            <input id="name" type="text" className="form-control my-2 " placeholder="Name"/>
          </div>
          <div className="col-6 ">
            <input id="lastname" type="text" className="form-control my-2 " placeholder="Last name"/>
          </div>
        </div>

        <button type="button" onClick={registerBtn} className="btn btn-primary d-flex border shadow my-2">Register</button>
        
      </div>
    </>
  )
}

export default RegisterForm