import React, {useState, useEffect} from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import WelcomePage from '../components/WelcomePage';

  
const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginForm/>
    },
    {
      path: "/register",
      element: <RegisterForm/>,
    },
    {
        path: "/",
        element: <WelcomePage/>
    }

  ]);

function Home() {
    useEffect(() => {
        console.log('home')
    });
    
  return (
    <div>
        <div className="window border col-8 mx-auto mt-4  bg-light">
            <RouterProvider router={router} />
            {/* <LoginForm/>  */}
            {/* <RegisterForm/> */}
        </div>
    </div>
  )
}

export default Home