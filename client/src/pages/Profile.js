import React from 'react'
import Navigation from "../components/Navigation.js";
// import { useParams } from "react-router-dom";
// import { useQuery } from '@apollo/client';
// import { QUERY_PROTECTED } from "../utils/queries";
// import Userfront from "@userfront/core";
// import {  Alert } from "react-bootstrap";
// import Auth from "../utils/auth";

import "../styles/App.css";
import "../styles/Profile.css";



// Define the Login form component
const Profile = () => {
    return (
      <div>
        <Navigation />
    <div>
        <h1>profile page</h1>
        <p>this page will have all of the users saved music, also all of their reviews they have written about music too.</p>
    </div>
  </div>
    );
  }


// Render the login form
export default Profile;