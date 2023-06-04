import React
// { useState } 
from 'react'
// import Navigation from "../components/Nav.js";
// import Userfront from "@userfront/core";
// import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../utils/mutations";
// import {  Alert } from "react-bootstrap";
// import Auth from "../utils/auth";

import "../styles/App.css";
import "../styles/Login.css";



// Define the Login form component
const Login = () => {
//   const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  
  // eslint-disable-next-line 
//   const [loginUser, { error, data }] = useMutation(LOGIN_USER);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // check if form has everything (as per react-bootstrap docs)
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     try {
//       const { data } = await loginUser({ variables: { ...userFormData } });

//       Auth.login(data.loginUser.token);
//     //   window.location.href = '/profile';
//     } catch (err) {
//       console.error(err);
//       // setShowAlert(true);
//     }

//     setUserFormData({
//       email: "",
//       password: "",
//     });
//   };
  //   }).catch((error) => {
  //     this.setAlertMessage(error.message);
  //   });
  // }

  // setAlertMessage(message) {
  //   this.setState({ alertMessage: message });
  // }
 
    return (
      <div>
    {/* <div className=''>
    <form 
    // onSubmit={handleFormSubmit}
     className="">
      <label className=''>
        Email
        <input
          name="email"
          type="text"
        //   value={userFormData.email}
        //   onChange={handleInputChange}
          className=""
        />
      </label>
      <label className='l'>
        Password
        <input
          name="password"
          type="password"
        //   value={userFormData.password}
        //   onChange={handleInputChange}
          className=""
        />
      </label>
      <button type="submit" className=''>Log in</button>
    </form>
    
    </div> */}
    <div>
        <h1>login/signup page</h1>
        <p>make it like a flippable thing between login/signup and even have things like signing up with google</p>
    </div>
  </div>
    );
  }


// Render the login form
export default Login;