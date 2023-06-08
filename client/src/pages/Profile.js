import React from 'react'
import Navigation from "../components/Navigation.js";
import UserCard from '../components/UserCard.js';
import SearchForm from '../components/SearchForm.js';
// import Userfront from "@userfront/core";
// import {  Alert } from "react-bootstrap";
// import Auth from "../utils/auth";

// import "../styles/App.css";
import "../styles/Profile.css";



// Define the Login form component
const Profile = () => {
    return (
      <div className=''>
        <Navigation />
    <div className=''>
      <UserCard />
    </div>
      <div>
        <SearchForm />
      </div>
  </div>
    );
  }


// Render the login form
export default Profile;