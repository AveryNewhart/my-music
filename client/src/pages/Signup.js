import React, { useState } from 'react'
// import Navigation from '../components/Nav';
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../utils/mutations'
import {  Alert } from "react-bootstrap";
import Auth from '../utils/auth';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
//   MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Signup = () => {
    const [userFormData, setUserFormData] = useState({
        email: "",
        username: "",
        password: ""
      });
      // set state for form validation
      // const [validated] = useState(false);
      // set state for alert
      const [showAlert, setShowAlert] = useState(false);
    
      // const history = useHistory();
    // eslint-disable-next-line 
      const [createUser, { error, data }] = useMutation(CREATE_USER);
    
      const handleInputChange = (event) =>
      {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };
    
      const handleFormSubmit = async (event) =>
      {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false)
        {
        //   event.preventDefault();
          event.stopPropagation();
          return;
        }
    
        try
        {
            // eslint-disable-next-line 
          const { data } = await createUser({
            variables: { input: { ...userFormData } },
          });
    
          Auth.login(data.createUser.token);
          window.location.href = '/profile';
          // history.push("/profile");
        } catch (err)
        {
          console.error(err);
          setShowAlert(true);
        }
    
        setUserFormData({
          username: "",
          email: "",
          password: ""
        });
      };

  return (
    <MDBContainer fluid className='p-4 overflow-hidden'>

      <MDBRow>
      <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Welcome To, <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>My Music</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            write a message here describing the site and what not, make it like 3-5 lines
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
          {/* <form onSubmit={handleFormSubmit}> */}
            <MDBCardBody className='p-5'>
            <form onSubmit={handleFormSubmit}>

                <MDBInput label='Username' type='text'  id='formControlDefault' 
                // value={userFormData.username} 
                onChange={handleInputChange}
                name="username"
                 />
                <MDBInput  label='Email' type='text' id='formControlDefault' 
                // value={userFormData.email} 
                onChange={handleInputChange} 
                name="email"
                 />
                <MDBInput label='Password' type='text' id='formControlDefault' 
                // value={userFormData.password}
                onChange={handleInputChange}
                name="password" 
                 />

              <MDBBtn className='w-100 mb-4' size='md' type='submit' >sign up</MDBBtn>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

              </div>
              </form>
            </MDBCardBody>
            {/* </form> */}
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;