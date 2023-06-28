import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';

const AnyProfile = () => {
    const { username } = useParams();
  
    // Query user data using QUERY_USER
    const { loading, error, data } = useQuery(QUERY_USER, {
      variables: { username },
    });
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const user = data?.user;
    if (!user) {
      return <p>User not found</p>;
    }
  
    // Return JSX to display user data
    return (
      <div>
        {/* Display user data */}
        <h1>{user.username}</h1>
        <div className="section">
          <h3>Followers</h3>
          {/*might not have to do map, might have to do it another way so it doesnt show all users, just a number  */}
          {user.followers.map((user) => (
            <h3>{user.username}</h3>
          ))}
        </div>
        <div className="section">
          <h3>Following</h3>
           {/*might not have to do map, might have to do it another way so it doesnt show all users, just a number  */}
          {user.following.map((user) => (
            <h3>{user.username}</h3>
          ))}
        </div>
        <div className="section">
          <h3>Listened Albums</h3>
          {user.listenedAlbums.map((album) => (
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
          {user.wannaListenAlbums.map((album) => (
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
          {user.reviews.map((review) => (
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
  