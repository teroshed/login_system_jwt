import React, {useState, useEffect} from 'react'
import axios from 'axios';
import FormNavigation from './FormNavigation';
import {verifyToken, registerRequest} from '../misc/loginUtils'
import cookies from '../misc/cookies.js';
import { useNavigate } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import Swal from 'sweetalert2';

function RegisterForm() {
  const [labels, setLabels] = useState({});
  const [first, setFirst] = useState(true);
  const [exists, setExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  })


  async function sendRegister(email, password, name, lastname)
  {
    let res = await axios.post("http://localhost:3001/register", { email, password, name, lastname})
    console.log("Register res: ", res.data);
    if(res.data.ok)
    {
      Swal.fire({
        title: "Succesfully registered !",
        icon: 'success',
        timer: 2000,

      }).then(() => navigate("/login"));
    }
    else
    {
      if(res.data.code == 1)
      {
        setExists(true);
        console.log("User with that email already registered");
      }
      console.log("error at registration ", res.data.message);
    }
  }

  function submitForm(e)
  {
    setExists(false);
    e.preventDefault();
    let fields = {
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      name: document.getElementById("name"),
      lastname: document.getElementById("lastname")
    };

    let tempLabels = {};
    let keys = Object.keys(fields);
    let flag = true;
    for(let i = 0; i < keys.length; i++)
    {
      if(!fields[keys[i]].value.replaceAll(" ", ""))
      {
        tempLabels[keys[i]] = true;
        fields[keys[i]].classList.add("required");
        flag = false;
      }
      else
      {
        fields[keys[i]].classList.remove("required");

      }
    }
    setLabels(tempLabels);

    if(flag)
    {
      sendRegister(fields.email.value, fields.password.value, fields.name.value, fields.lastname.value);
      
    }
  }
  

  // on
  
  return (
    <FormWrapper>
            
      <form onSubmit={submitForm} className="p-4"> 
      
        <h4> Register: </h4>


        
        <div className="">
          <input  type="text" id="email" className="form-control my-2" placeholder="E-mail"/>
          {labels.email && <label  className="form-label d-flex text-danger mx-2 "> E-mail can't be empty</label>}
        </div>

        <div className="">
          <input  type="text" id="password" className="form-control my-2" placeholder="Password"/> 
          {labels.password && <label  className="form-label d-flex text-danger mx-2 ">Password can't be empty</label>}
        </div>


        

        <div className="row ">
          <div className="col-6">
            <input id="name" type="text" className="form-control my-2 " placeholder="Name"/>
            {labels.name && <label  className="form-label d-flex text-danger mx-2 ">Name can't be empty</label>}

          </div>
          <div className="col-6 ">
            <input id="lastname" type="text" className="form-control my-2 " placeholder="Last name"/>
            {labels.lastname && <label  className="form-label d-flex text-danger mx-2 ">Last name can't be empty</label>}

          </div>
        </div>
        
        <div className="row">
          {exists && <label className='text-danger'> User with that email already exists </label>}
        </div>

        <button type="submit" className="btn btn-primary d-flex border shadow my-2">Register</button>
        
      </form>
    </FormWrapper>
  )
}

export default RegisterForm