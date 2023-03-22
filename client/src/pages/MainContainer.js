import React, {useState, useEffect} from 'react'
import {
    createBrowserRouter,
    RouterProvider,
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



function MainContainer() {
    useEffect(() => {
        console.log('home')
    });
    
  return (
    <div className="app">
    
      <NavigationBar/>
      
    </div>
  )
}

export default MainContainer;