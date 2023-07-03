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
  const [activeSection, setActiveSection] = useState('listened');
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
  <MDBCardBody>
          <div className="profile-section">
      <MDBCardImage   
        src={user.profilePicture || DeafultPic}
        alt="Profile Picture"
        position="top"
        className="profile-picture"
      />
      <ProfilePicture />
      <MDBCardText className="usernameArea">
        {user.username || "User Name"}
      </MDBCardText>
      <div className="followers-following">
        <div className="section">
          <h3>Followers</h3>
          <p>
            <button
              className="link-button profBut"
              onClick={() => handleTabClick("followers")}
            >
              {user.followers.length}
            </button>
          </p>
        </div>
        <div className="section">
          <h3>Following</h3>
          <p>
            <button
              className="link-button profBut"
              onClick={() => handleTabClick("following")}
            >
              {user.following.length}
            </button>
          </p>
        </div>
      </div>
    </div>
                {/* Buttons for each section */}
      <div className="section-buttons">
        <button className="profBut" onClick={() => setActiveSection("listened")}>Listened Albums</button>
        <button className="profBut" onClick={() => setActiveSection("wannaListen")}>Wanna Listen Albums</button>
        <button className="profBut" onClick={() => setActiveSection("reviews")}>Reviews</button>
      </div>

{/* Listened Albums */}
<div className={`section ${activeSection === "listened" ? "active" : ""}`}>
        {activeSection === "listened" && <h3>Listened Albums</h3>}
        <div className="album-list">
          {activeSection === "listened" &&
            user.listenedAlbums.map((album, index) => (
              <div key={index} className="album">
                <img src={album.albumPic} alt="" className="coverArt" />
                <p className='musicText'>Artist: {album.artistName}</p>
                <p className='musicText'>Album: {album.albumName}</p>
                <p className='musicText'>Release Date: {album.releaseDate}</p>
              </div>
            ))}
        </div>
      </div>

    {/* Wanna Listen Albums */}
    <div className={`section ${activeSection === "wannaListen" ? "active" : ""}`}>
        {activeSection === "wannaListen" && <h3>Wanna Listen Albums</h3>}
        <div className="album-list">
          {activeSection === "wannaListen" &&
            user.wannaListenAlbums.map((album, index) => (
              <div key={index} className="album">
                <img src={album.albumPic} alt="" className="coverArt" />
                <p className='musicText'>Artist: {album.artistName}</p>
                <p className='musicText'>Album: {album.albumName}</p>
                <p className='musicText'>Release Date: {album.releaseDate}</p>
              </div>
            ))}
        </div>
      </div>


    {/* Reviews */}
    <div className={`section ${activeSection === "reviews" ? "active" : ""}`}>
        {activeSection === "reviews" && <h3>Reviews</h3>}
        <div className="album-list">
          {activeSection === "reviews" &&
            user.reviews.map((review, index) => (
              <div key={index} className="album reviewDiv">
                <p className='musicText'>Album: {review.albumName}</p>
                <p className='reviewText'>Review: {review.reviewText}</p>
              </div>
            ))}
        </div>
      </div>
      
        <Modal show={followersModalOpen} onHide={() => setFollowersModalOpen(false)} className="custom-modal">
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
      <Modal show={followingModalOpen} onHide={() => setFollowingModalOpen(false)} className="custom-modal">
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
  </MDBCardBody>
  {/* </div> */}
</MDBCard>
    );
  }


// Render the login form
export default UserCard;
  