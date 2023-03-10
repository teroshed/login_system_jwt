import React, {useState, useEffect} from 'react'
import axios from 'axios';


function RegisterForm() {
  const [emailLabel, setEmailLabel] = useState(false);
  const [passwordLabel, setPasswordLabel] = useState(false);
  const [usernameLabel, setUsernameLabel] = useState(false);

  function registerBtn()
  {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let username = document.getElementById("username");
    let name = document.getElementById("name");
    let lastname = document.getElementById("lastname");

    let cantEmpty = [
      email,
      password,
      username
    ];

    cantEmpty.forEach(e => {
      let empty = e.value.replaceAll(" ", "") == "";
      if(empty)
      {
        e.classList.add("required");
      }
      else
      {
        e.classList.remove("required");
      }
    })
    let emEmpty = email.value.replaceAll(" ", "") == "";
    let passEmpty = password.value.replaceAll(" ", "") == "";
    let usernameEmpty = username.value.replaceAll(" ", "") == "";
    setEmailLabel(emEmpty);
    setPasswordLabel(passEmpty);
    setUsernameLabel(usernameEmpty);

    

    if(email.value && password.value && username.value)
    {
      sendRegister(email.value, password.value, username.value, name.value, lastname.value);
    }

    console.log(`register: email: ${email.value} password: ${password.value}, username: ${username.value}`);
  }

  async function sendRegister(email, password, username, name, lastname)
  {
    let res = await axios.post("http://localhost:3001/register", { email, password, username, name, lastname})
    console.log("Register res: ", res.data);
    if(res.data.suceess)
    {

    }
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
          {emailLabel && <label  className="form-label d-flex text-danger mx-2 "> E-mail can't be empty</label>}
        </div>

        <div className="">
          <input onChange={onPasswordChange} type="text" id="password" className="form-control my-2" placeholder="Password"/> 
          {passwordLabel && <label  className="form-label d-flex text-danger mx-2 ">Password can't be empty</label>}
        </div>

        <div className="">
          <input onChange={onUsernameChange} id="username" type="text" className="form-control my-2 " placeholder="Username"/>
          {usernameLabel && <label className="form-label d-flex text-danger mx-2">Username can't be empty</label>}
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