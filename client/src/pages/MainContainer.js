import React, {useState, useEffect} from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    useLocation,
    useNavigate,
    useRoutes,
  } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import NavigationBar from '../components/NavigationBar';
import RegisterForm from '../components/RegisterForm';
import Welcome from '../components/Welcome';
import '../styles/Main.css';
import VacationsPage from './VacationsPage';

import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux'
import { element } from 'prop-types';
import { Outlet } from "react-router-dom";
import cookies from '../misc/cookies';
import jwtDecode from 'jwt-decode';



function MainContainer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  // const route = useRoutes();
    useEffect(() => {
      let token = cookies.getCookie('token');
      let decoded = jwtDecode(token);
      if(new Date().getTime())
      if(location.pathname == "/")
        navigate('/vacations');
      console.log(location);
    });
    
  return (
    <div className="app">
    
      <NavigationBar/>
      <Outlet/>
    </div>
  )
}

export default MainContainer;