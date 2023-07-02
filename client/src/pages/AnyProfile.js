import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { ADD_FOLLOWER } from '../utils/mutations';
import Navigation from "../components/Navigation.js";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import "../styles/UserCard.css"
import DeafultPic from "../images/defaultprof.png"

const AnyProfile = () => {
    const { username } = useParams();

      // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState('followers');
  const [activeSection, setActiveSection] = useState('listened');
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);
  
    // Query user data using QUERY_USER
    const { loading, error, data, refetch } = useQuery(QUERY_USER, {
      variables: { username },
    });

      // Add the mutation hook
  const [addFollower] = useMutation(ADD_FOLLOWER);

  const [user, setUser] = useState(null);
    // State to track if the user is already being followed
    const [isFollowing, setIsFollowing] = useState(false);

    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
     
      if (tabName === 'followers') {
        setFollowersModalOpen(true);
      } else if (tabName === 'following') {
        setFollowingModalOpen(true);
      }
    };

    // Use useEffect to update the user state when the data changes
    useEffect(() => {
      if (data?.user) {
        setUser(data.user);
      }
    }, [data]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    // const user = data?.user;
    if (!user) {
      return <p>User not found</p>;
    }
    const handleFollow = async () => {
        try {
          // Execute the mutation
          // const { data } = 
          await addFollower({
            variables: { id: user.id }, // Pass the user ID as a variable
          });
      
          // Get the updated user data from the mutation response
          // const updatedUser = data.addFollower;
            // Get the user being followed
      // const userToFollow = data?.user;

           // Update the user's following count
           setUser((prevUser) => ({
            ...prevUser,
            following: prevUser.following ? [...prevUser.following, user._id] : [user._id],
          }));

      // Refetch the user data to get the updated following count
      refetch();
      
          // Update the user state or perform any other necessary actions
          // ...
                // Update the isFollowing state based on the response
      setIsFollowing(true);

        } catch (error) {
          console.error(error);
          // Handle any errors that occur during the mutation
          // ...
        }
      };

      // {isFollowing ? (
      //   <button disabled>Following</button>
      // ) : (
      //   <button onClick={handleFollow}>Follow</button>
      // )}

      return (
        <>
        <Navigation/>
        <MDBCard className="card-container">
        <MDBCardBody>
                <div className="profile-section">
            <MDBCardImage   
              src={user.profilePicture || DeafultPic}
              alt="Profile Picture"
              position="top"
              className="profile-picture"
            />
            <MDBCardText className="usernameArea">
              {user.username || "User Name"}
            </MDBCardText>
             {isFollowing ? (
         <button disabled>Following</button>
       ) : (
        <button onClick={handleFollow}>Follow</button>
       )}
            <div className="followers-following">
              <div className="section">
                <h3>Followers</h3>
                <p>
                  <button
                    className="link-button"
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
                    className="link-button"
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
              <button onClick={() => setActiveSection("listened")}>Listened Albums</button>
              <button onClick={() => setActiveSection("wannaListen")}>Wanna Listen Albums</button>
              <button onClick={() => setActiveSection("reviews")}>Reviews</button>
            </div>
      
      {/* Listened Albums */}
      <div className={`section ${activeSection === "listened" ? "active" : ""}`}>
              {activeSection === "listened" && <h3>Listened Albums</h3>}
              <div className="album-list">
                {activeSection === "listened" &&
                  user.listenedAlbums.map((album, index) => (
                    <div key={index} className="album">
                      <img src={album.albumPic} alt="" className="coverArt" />
                      <p>Artist: {album.artistName}</p>
                      <p>Album: {album.albumName}</p>
                      <p>Release Date: {album.releaseDate}</p>
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
                      <p>Artist: {album.artistName}</p>
                      <p>Album: {album.albumName}</p>
                      <p>Release Date: {album.releaseDate}</p>
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
                    <div key={index} className="album">
                      <p>Album: {review.albumName}</p>
                      <p>Review: {review.reviewText}</p>
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
      </>
          );
        }
  
  export default AnyProfile;
  