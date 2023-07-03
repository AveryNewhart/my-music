import React, { useState, useEffect } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

import { useParams } from "react-router-dom";
import { useQuery, 
  // useMutation 
} from '@apollo/client';
// import { REMOVE_LISTENED_ALBUM, REMOVE_WANNA_LISTEN_ALBUM, REMOVE_REVIEW 
// } from '../utils/mutations';
import { QUERY_PROTECTED } from "../utils/queries";
import ProfilePicture from '../components/ProfilePicture';
import "../styles/UserCard.css";
import DeafultPic from "../images/defaultprof.png" 



// Define the Login form component
const UserCard = () => {
  const { username } = useParams();
  const { loading, data } = useQuery(QUERY_PROTECTED, 
    {
    variables: { username },
  });

  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState('followers');
  const [activeSection, setActiveSection] = useState('listened');
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);
  // const [user, setUser] = useState(data?.protected);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(data?.protected);
  }, [data]);

  // eslint-disable-next-line
  //! remove buttons under construction
  // const [removeListenedAlbum, { loading: listenedAlbumLoading, error: listenedAlbumError }] = useMutation(REMOVE_LISTENED_ALBUM);
  // const [removeListenedAlbum] = useMutation(REMOVE_LISTENED_ALBUM, {
  //   refetchQueries: [{ query: QUERY_PROTECTED }],
  // });
  // eslint-disable-next-line
  // const [removeWannaListenAlbum, { loading: wannaListenAlbumLoading, error: wannaListenAlbumError }] = useMutation(REMOVE_WANNA_LISTEN_ALBUM);
  // const [removeReview, { loading: reviewLoading, error: reviewError }] = useMutation(REMOVE_REVIEW);

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

//! remove buttons under construction
// const handleRemoveListenedAlbum = async (id) => {
//   try {
//     const response = await removeListenedAlbum({ variables: { id } });
//     const updatedUser = response.data.removeListenedAlbum;
//     // user.listenedAlbums = updatedUser.listenedAlbums;
//     setUser((prevUser) => ({
//       ...prevUser,
//       listenedAlbums: updatedUser.listenedAlbums,
//     }));
//   } catch (error) {
//     // Handle the error...
//   }
// };

// const handleRemoveWannaListenAlbum = async (id) => {
//   try {
//     const response = await removeWannaListenAlbum({ variables: { id } });
//     const updatedUser = response.data.removeWannaListenAlbum;
//     // user.listenedAlbums = updatedUser.listenedAlbums;
//     setUser((prevUser) => ({
//       ...prevUser,
//       wannaListenAlbums: updatedUser.wannaListenAlbums,
//     }));
//   } catch (error) {
//     // Handle the error...
//   }
// };

// const handleRemoveReview = async (id) => {
//   try {
//     const response = await removeReview({ variables: { id } });
//     const updatedUser = response.data.removeReview;
//     // user.listenedAlbums = updatedUser.listenedAlbums;
//     setUser((prevUser) => ({
//       ...prevUser,
//       reviews: updatedUser.reviews,
//     }));
//   } catch (error) {
//     // Handle the error...
//   }
// };
    

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
            user?.listenedAlbums?.map((album, index) => (
              <div key={index} className="album">
                <img src={album.albumPic} alt="" className="coverArt" />
                <p className='musicText'>Artist: {album.artistName}</p>
                <p className='musicText'>Album: {album.albumName}</p>
                <p className='musicText'>Release Date: {album.releaseDate}</p>
                {/* <button
                  className="profBut"
                  onClick={() => handleRemoveListenedAlbum(album.id)}
                >
                  Delete
                </button> */}
              </div>
            ))}
        </div>
      </div>

    {/* Wanna Listen Albums */}
    <div className={`section ${activeSection === "wannaListen" ? "active" : ""}`}>
        {activeSection === "wannaListen" && <h3>Wanna Listen Albums</h3>}
        <div className="album-list">
          {activeSection === "wannaListen" &&
            user?.wannaListenAlbums?.map((album, index) => (
              <div key={index} className="album">
                <img src={album.albumPic} alt="" className="coverArt" />
                <p className='musicText'>Artist: {album.artistName}</p>
                <p className='musicText'>Album: {album.albumName}</p>
                <p className='musicText'>Release Date: {album.releaseDate}</p>
                {/* <button
                  className="profBut"
                  onClick={() => handleRemoveWannaListenAlbum(album.id)}
                >
                  Delete
                </button> */}
              </div>
            ))}
        </div>
      </div>


    {/* Reviews */}
    <div className={`section ${activeSection === "reviews" ? "active" : ""}`}>
        {activeSection === "reviews" && <h3>Reviews</h3>}
        <div className="album-list">
          {activeSection === "reviews" &&
            user?.reviews?.map((review, index) => (
              <div key={index} className="album reviewDiv">
                <p className='musicText'>Album: {review.albumName}</p>
                <p className='reviewText'>Review: {review.reviewText}</p>
                {/* <button
                  className="delete-button"
                  onClick={() => handleRemoveReview(review.id)}
                >
                  Delete
                </button> */}
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
  