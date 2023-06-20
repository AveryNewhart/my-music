import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import Navigation from '../components/Navigation';

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
      <Navigation />
      <h1>Feed Page</h1>
      {users.map((user) => (
        <div key={user.id}>
          {user.listenedAlbums.map((album) => (
            <div key={album.id}>
              <h2>{user.username}</h2>
              {/* <h3>Listened Albums:</h3> */}
              <ul>
                <li>
                  {user.username} added {album.albumName} to Listened Albums
                </li>
              </ul>
            </div>
          ))}
          {user.wannaListenAlbums.map((album) => (
            <div key={album.id}>
              <h2>{user.username}</h2>
              {/* <h3>Wanna Listen Albums:</h3> */}
              <ul>
                <li>
                  {user.username} added {album.albumName} to Wanna Listen Albums
                </li>
              </ul>
            </div>
          ))}
          {user.reviews.map((review) => (
            <div key={review.id}>
              <h2>{user.username}</h2>
              {/* <h3>Reviews:</h3> */}
              <ul>
                <li>
                  {user.username} posted a review for {review.albumName}: {review.reviewText}
                </li>
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Feed;


// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_USERS } from '../utils/queries';
// import Navigation from '../components/Navigation';

// const Feed = () => {
//   // Fetch the data using the QUERY_USERS query
//   const { loading, error, data } = useQuery(QUERY_USERS);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error occurred: {error.message}</p>;
//   }

//   const users = data.users;

//   return (
//     <div>
//       <Navigation />
//       <h1>Feed Page</h1>
//       {users.map((user) => (
//         <div key={user.id}>
//           <h2>{user.username}</h2>
//           <h3>Listened Albums:</h3>
//           <ul>
//             {user.listenedAlbums.map((album) => (
//               <li key={album.id}>
//                 {user.username} added {album.albumName} to Listened Albums
//               </li>
//             ))}
//           </ul>
//           <h3>Wanna Listen Albums:</h3>
//           <ul>
//             {user.wannaListenAlbums.map((album) => (
//               <li key={album.id}>
//                 {user.username} added {album.albumName} to Wanna Listen Albums
//               </li>
//             ))}
//           </ul>
//           <h3>Reviews:</h3>
//           <ul>
//             {user.reviews.map((review) => (
//               <li key={review.id}>
//                 {user.username} posted a review for {review.albumName}: {review.reviewText}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;

