import React, {useState, useEffect} from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import NavigationBar from './components/NavigationBar';
import RegisterForm from './components/RegisterForm';
// import Welcome from '../components/Welcome';
import './styles/Main.css';
import VacationsPage from './pages/VacationsPage';

import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux'
import { element } from 'prop-types';
import MainContainer from './pages/MainContainer';
import AddVacation from './pages/AddVacation';

  
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
        path: "/addvacation",
        element: <AddVacation/>
    },
    {
        path: "/",
        element: <MainContainer/>
    }

  ]);

function Routing() {
    useEffect(() => {
        console.log('home')
    });
    
  return (
    <div className="app">
    
      {/* <NavigationBar/> */}
      
      <RouterProvider router={router} />
    </div>
  )
}

export default Routing;