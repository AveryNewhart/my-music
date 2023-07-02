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
import ProfilePicture from '../components/ProfilePicture';
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
          <ProfilePicture />
          <div className="section">
          <h3>Followers</h3>
          <p>{user.followers.length}</p>
        </div>
        <div className="section">
          <h3>Following</h3>
          <p>{user.following.length}</p>
        </div>
        <div className="section">
          <h3>Listened Albums</h3>
          {user.listenedAlbums.map((album, index) => (
            <div key={index} className="album">
              <img src={album.albumPic} alt="" className="coverArt" />
              <p>Artist: {album.artistName}</p>
              <p>Album: {album.albumName}</p>
              <p>Release Date: {album.releaseDate}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h3>Wanna Listen Albums</h3>
          {user.wannaListenAlbums.map((album, index) => (
            <div key={index} className="album">
              <img src={album.albumPic} alt="" className="coverArt" />
              <p>Artist: {album.artistName}</p>
              <p>Album: {album.albumName}</p>
              <p>Release Date: {album.releaseDate}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h3>Reviews</h3>
          {user.reviews.map((review, index) => (
            <div key={index} className="review">
              <p>Album: {review.albumName}</p>
              <p>Review: {review.reviewText}</p>
            </div>
          ))}
        </div>
  </MDBCardBody>
  {/* </div> */}
</MDBCard>
    );
  }


// Render the login form
export default UserCard;
  