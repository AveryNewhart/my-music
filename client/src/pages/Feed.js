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

  // Create an object to store posts grouped by username
  const userPosts = {};

  // Group the posts by username
  users.forEach((user) => {
    user.listenedAlbums.forEach((album) => {
      const post = {
        id: album.id,
        username: user.username,
        type: 'Listened Albums',
        albumName: album.albumName,
        timestamp: album.timestamp,
      };
      if (!userPosts[user.username]) {
        userPosts[user.username] = [post];
      } else {
        userPosts[user.username].push(post);
      }
    });

    user.wannaListenAlbums.forEach((album) => {
      const post = {
        id: album.id,
        username: user.username,
        type: 'Wanna Listen Albums',
        albumName: album.albumName,
        timestamp: album.timestamp,
      };
      if (!userPosts[user.username]) {
        userPosts[user.username] = [post];
      } else {
        userPosts[user.username].push(post);
      }
    });

    user.reviews.forEach((review) => {
      const post = {
        id: review.id,
        username: user.username,
        type: 'Reviews',
        albumName: review.albumName,
        reviewText: review.reviewText,
        timestamp: review.timestamp,
      };
      if (!userPosts[user.username]) {
        userPosts[user.username] = [post];
      } else {
        userPosts[user.username].push(post);
      }
    });
  });

  return (
    <div>
      <Navigation />
      <h1>Feed Page</h1>
      {Object.keys(userPosts).map((username) => (
        <div key={username}>
          <h2>{username}</h2>
          {userPosts[username].map((post) => (
            <div key={post.id}>
              <h3>{post.type}</h3>
              {post.type === 'Listened Albums' && (
                <ul>
                  <li>
                    {post.username} added {post.albumName} to Listened Albums
                  </li>
                </ul>
              )}
              {post.type === 'Wanna Listen Albums' && (
                <ul>
                  <li>
                    {post.username} added {post.albumName} to Wanna Listen Albums
                  </li>
                </ul>
              )}
              {post.type === 'Reviews' && (
                <ul>
                  <li>
                    {post.username} posted a review for {post.albumName}: {post.reviewText}
                  </li>
                </ul>
              )}
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

//   // Combine all the actions into a single array and sort them by timestamp
//   const actions = users.flatMap((user) => {
//     const userActions = [];

//     user.listenedAlbums.forEach((album) => {
//       userActions.push({
//         id: album.id,
//         username: user.username,
//         type: 'Listened Albums',
//         albumName: album.albumName,
//         timestamp: album.timestamp,
//       });
//     });

//     user.wannaListenAlbums.forEach((album) => {
//       userActions.push({
//         id: album.id,
//         username: user.username,
//         type: 'Wanna Listen Albums',
//         albumName: album.albumName,
//         timestamp: album.timestamp,
//       });
//     });

//     user.reviews.forEach((review) => {
//       userActions.push({
//         id: review.id,
//         username: user.username,
//         type: 'Reviews',
//         albumName: review.albumName,
//         reviewText: review.reviewText,
//         timestamp: review.timestamp,
//       });
//     });

//     return userActions;
//   }).sort((a, b) => a.timestamp - b.timestamp);

//   return (
//     <div>
//       <Navigation />
//       <h1>Feed Page</h1>
//       {actions.map((action) => (
//         <div key={action.id}>
//           <h2>{action.username}</h2>
//           <h3>{action.type}</h3>
//           {action.type === 'Listened Albums' && (
//             <ul>
//               <li>
//                 {action.username} added {action.albumName} to Listened Albums
//               </li>
//             </ul>
//           )}
//           {action.type === 'Wanna Listen Albums' && (
//             <ul>
//               <li>
//                 {action.username} added {action.albumName} to Wanna Listen Albums
//               </li>
//             </ul>
//           )}
//           {action.type === 'Reviews' && (
//             <ul>
//               <li>
//                 {action.username} posted a review for {action.albumName}: {action.reviewText}
//               </li>
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;





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
//           {user.listenedAlbums.map((album) => (
//             <div key={album.id}>
//               <h2>{user.username}</h2>
//               {/* <h3>Listened Albums:</h3> */}
//               <ul>
//                 <li>
//                   {user.username} added {album.albumName} to Listened Albums
//                 </li>
//               </ul>
//             </div>
//           ))}
//           {user.wannaListenAlbums.map((album) => (
//             <div key={album.id}>
//               <h2>{user.username}</h2>
//               {/* <h3>Wanna Listen Albums:</h3> */}
//               <ul>
//                 <li>
//                   {user.username} added {album.albumName} to Wanna Listen Albums
//                 </li>
//               </ul>
//             </div>
//           ))}
//           {user.reviews.map((review) => (
//             <div key={review.id}>
//               <h2>{user.username}</h2>
//               {/* <h3>Reviews:</h3> */}
//               <ul>
//                 <li>
//                   {user.username} posted a review for {review.albumName}: {review.reviewText}
//                 </li>
//               </ul>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feed;

