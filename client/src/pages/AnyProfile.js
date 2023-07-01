import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { ADD_FOLLOWER } from '../utils/mutations';
import Navigation from "../components/Navigation.js";

const AnyProfile = () => {
    const { username } = useParams();
  
    // Query user data using QUERY_USER
    const { loading, error, data, refetch } = useQuery(QUERY_USER, {
      variables: { username },
    });

      // Add the mutation hook
  const [addFollower] = useMutation(ADD_FOLLOWER);

  const [user, setUser] = useState(null);

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
        following: prevUser.following ? [...prevUser.following, { _id: prevUser._id, username: prevUser.username }] : [{ _id: prevUser._id, prevUser: user.username }],
      }));

      // Refetch the user data to get the updated following count
      refetch();
      
          // Update the user state or perform any other necessary actions
          // ...
        } catch (error) {
          console.error(error);
          // Handle any errors that occur during the mutation
          // ...
        }
      };

      return (
        <div>
          <Navigation />
          {/* Display user data */}
          <h1>{user?.username}</h1>
          <button onClick={handleFollow}>Follow</button>
          {/* <div className="section">
            <h3>Followers</h3>
            {user?.followers.map((follower) => (
              <h3 key={follower._id}>{follower.username}</h3>
            ))}
          </div>
          <div className="section">
            <h3>Following</h3>
            {user?.following.map((followingUser) => (
              <h3 key={followingUser._id}>{followingUser.username}</h3>
            ))}
          </div> */}
          <div className="section">
            <h3>Listened Albums</h3>
            {user?.listenedAlbums.map((album) => (
              <div key={album.id} className="album">
                <img src={album.albumPic} alt="" className="coverArt" />
                <p>Artist: {album.artistName}</p>
                <p>Album: {album.albumName}</p>
                <p>Release Date: {album.releaseDate}</p>
              </div>
            ))}
          </div>
      
          <div className="section">
            <h3>Wanna Listen Albums</h3>
            {user?.wannaListenAlbums.map((album) => (
              <div key={album.id} className="album">
                <img src={album.albumPic} alt="" className="coverArt" />
                <p>Artist: {album.artistName}</p>
                <p>Album: {album.albumName}</p>
                <p>Release Date: {album.releaseDate}</p>
              </div>
            ))}
          </div>
      
          <div className="section">
            <h3>Reviews</h3>
            {user?.reviews.map((review) => (
              <div key={review.id} className="review">
                <p>Album: {review.albumName}</p>
                <p>Review: {review.reviewText}</p>
              </div>
            ))}
          </div>
          {/* Other user data you want to display */}
        </div>
      );
  };
  
  export default AnyProfile;
  