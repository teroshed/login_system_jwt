import React, {useState, useEffect} from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import NavigationBar from '../components/NavigationBar';
import RegisterForm from '../components/RegisterForm';
import Welcome from '../components/Welcome';
import '../styles/Main.css';
import VacationsPage from './VacationsPage';

  
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
      path: "/vacations",
      element: <VacationsPage/>
    },
    {
        path: "/",
        element: <Welcome/>
    }

  ]);

function MainContainer() {
    useEffect(() => {
        console.log('home')
    });
    
  return (
    <div className="app">
      <NavigationBar/>
      <div className="window border col-8 mx-auto mt-4  bg-light center">
          <RouterProvider router={router} />
          {/* <LoginForm/>  */}
          {/* <RegisterForm/> */}
      </div>
    </div>
  )
}

export default MainContainer;