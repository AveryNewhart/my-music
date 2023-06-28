import React,
{ useState } 
from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
  import {  Alert } from "react-bootstrap";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  
// import Navigation from "../components/Nav.js";
// import Userfront from "@userfront/core";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
// import {  Alert } from "react-bootstrap";
import Auth from "../utils/auth";

// import "../styles/App.css";
import "../styles/Login.css";




// Define the Login form component
const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
//   const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
//   eslint-disable-next-line 
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({ variables: { ...userFormData } });

      Auth.login(data.loginUser.token);
      window.location.href = '/profile/:id';
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };
//     }).catch((error) => {
//       this.setAlertMessage(error.message);
//     });
//   }

//   setAlertMessage(message) {
//     this.setState({ alertMessage: message });
//   }
 
    return (
        <MDBContainer fluid>
                  <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
  
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <form onSubmit={handleFormSubmit}>
  
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                <MDBInput labelClass='text-white' label='Email address' 
                // id='formControlLg' 
                type='email' 
                // value={userFormData.email} 
                name="email"
                onChange={handleInputChange} size="lg"/>
                <MDBInput labelClass='text-white' label='Password' 
                // id='formControlLg' 
                type='password' 
                // value={userFormData.password} 
                name="password"
                onChange={handleInputChange} size="lg"/>
  
                {/* <MDBBtn outline className='mx-2 px-5' size='lg' type='submit'>
                  Login
                </MDBBtn> */}
                  <MDBBtn className='w-100 mb-4' size='md' type='submit' >Login</MDBBtn>
  
                <div className='d-flex flex-row mt-3 mb-5'>
  
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='google' size="lg"/>
                  </MDBBtn>
                </div>
  
                <div>
                  <p className="mb-0">Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a></p>
  
                </div>
                </form>
              </MDBCardBody>
            </MDBCard>
  
          </MDBCol>
        </MDBRow>
  
      </MDBContainer>

    );
  }




// Render the login form
export default Login;