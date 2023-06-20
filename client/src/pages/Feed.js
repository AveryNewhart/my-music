import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries'; // Path to your query file

const Feed = () => {
  // Fetch the data using the QUERY_USERS query
  const { loading, error, data } = useQuery(QUERY_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  const users = data.users;

  return (
    <div>
      <h1>Feed Page</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <h3>Listened Albums:</h3>
          <ul>
            {user.listenedAlbums.map((album) => (
              <li key={album.id}>{album.albumName}</li>
            ))}
          </ul>
          <h3>Wanna Listen Albums:</h3>
          <ul>
            {user.wannaListenAlbums.map((album) => (
              <li key={album.id}>{album.albumName}</li>
            ))}
          </ul>
          <h3>Reviews:</h3>
          <ul>
            {user.reviews.map((review) => (
              <li key={review.id}>
                <strong>Album: </strong> {review.albumName}<br />
                <strong>Review: </strong> {review.reviewText}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Feed;
