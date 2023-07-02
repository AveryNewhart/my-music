import React, { useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_PROTECTED } from "../utils/queries";
import ProfilePicture from '../components/ProfilePicture';
import "../styles/UserCard.css";
import DeafultPic from "../images/defaultprof.png"



// Define the Login form component
const UserCard = () => {
  const { username } = useParams();

  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState('followers');
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);

   // Query current user data
  //  const { loading, data } = useQuery(QUERY_PROTECTED);
  const { loading, data } = useQuery(QUERY_PROTECTED, 
    {
    variables: { username },
  });

   // Check if user data is present else provide empty obj
   const user = data?.protected;
   console.log(user)

   const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  
    if (tabName === 'followers') {
      setFollowersModalOpen(true);
    } else if (tabName === 'following') {
      setFollowingModalOpen(true);
    }
  };

   
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
          <p>
            <button
              className="link-button"
              onClick={() => handleTabClick('followers')}
            >
              {user.followers.length}
            </button>
          </p>
          {/* <p>{user.followers.length}</p> */}
        </div>
        <div className="section">
          <h3>Following</h3>
          <p>
            <button
              className="link-button"
              onClick={() => handleTabClick('following')}
            >
              {user.following.length}
            </button>
          </p>
          {/* <p>{user.following.length}</p> */}
        </div>
                {/* Followers Modal */}
      <Modal show={followersModalOpen} onHide={() => setFollowersModalOpen(false)}>
        <ModalHeader closeButton>
          Followers
        </ModalHeader>
        <ModalBody>
          {user.followers.length > 0 ? (
            <div className="user-list">
          {user.followers.map((user, index) => (
            <h3 key={index}>{user.username}</h3>
              ))}
            </div>
          ) : (
            <p>No followers found.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={() => setFollowersModalOpen(false)}>
            Close
          </button>
        </ModalFooter>
      </Modal>

      {/* Following Modal */}
      <Modal show={followingModalOpen} onHide={() => setFollowingModalOpen(false)}>
        <ModalHeader closeButton>
          Following
        </ModalHeader>
        <ModalBody>
          {user.following.length > 0 ? (
            <div className="user-list">
              {user.following.map((user, index) => (
                <h3 key={index}>{user.username}</h3>
              ))}
            </div>
          ) : (
            <p>No following found.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={() => setFollowingModalOpen(false)}>
            Close
          </button>
        </ModalFooter>
      </Modal>
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
  