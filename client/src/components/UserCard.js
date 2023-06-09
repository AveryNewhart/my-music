import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_PROTECTED } from "../utils/queries";
// import Userfront from "@userfront/core";
// import {  Alert } from "react-bootstrap";
// import Auth from "../utils/auth";

// import "../styles/App.css";
import "../styles/UserCard.css";
import DeafultPic from "../images/defaultprof.png"



// Define the Login form component
const UserCard = () => {
  const { username } = useParams();
   // Query current user data
  //  const { loading, data } = useQuery(QUERY_PROTECTED);
  const { loading, data } = useQuery(QUERY_PROTECTED, 
    {
    variables: { username },
  });

   // Check if user data is present else provide empty obj
   const user = data?.protected;
   console.log(user)
  
    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
  
    // const user = data.user;
    if (!user) return <p>User not found</p>;

    return (
  <MDBCard className="card-container">
    {/* <div className="card-container"> */}
  <MDBCardImage   
  src={user.profilePicture || DeafultPic }
  alt='...'
  position='top'
  className='profile-picture' />
  <MDBCardBody>
    <MDBCardText className='usernameArea'>
    {user.username || 'User Name'}
    </MDBCardText>
  </MDBCardBody>
  {/* </div> */}
</MDBCard>
    );
  }


// Render the login form
export default UserCard;
  