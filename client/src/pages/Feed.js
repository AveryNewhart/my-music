import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import Navigation from '../components/Navigation';
import { useNavigate, useParams } from 'react-router-dom';

const Feed = () => {
  const navigate = useNavigate()

  // Fetch the data using the QUERY_REVIEWS query
  const { loading, error, data } = useQuery(QUERY_REVIEWS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  console.log('data:', data);

  const reviews = data?.reviews ?? [];
  console.log('reviews:', reviews);

  // Create a copy of the reviews array and then sort it
  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
  console.log('sortedReviews:', sortedReviews);

  return (
    <div>
      <Navigation />
      <h1>Feed Page</h1>
      <ul>
        {sortedReviews.length > 0 ? (
          sortedReviews.reverse().map((review, index) => (
            <li key={index}>
              {/* <h2>{review.username}</h2> */}
              <button onClick={() => navigate(`/anyprofile/${review.username}`)}>{review.username}</button>
              <p>Album: {review.albumName}</p>
              <p>Review: {review.reviewText}</p>
            </li>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </ul>
    </div>
  );
};

export default Feed;


//
// import { useQuery } from '@apollo/client';
// import { QUERY_REVIEWS } from '../utils/queries';
// import Navigation from '../components/Navigation';

// const Feed = () => {
//   // Fetch the data using the QUERY_USERS query
//   const { loading, error, data } = useQuery(QUERY_REVIEWS);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error occurred: {error.message}</p>;
//   }

//   const reviews = data?.reviews ?? [];

//   // Create an array to store individual posts
//   const posts = [];

//   // Iterate over users and their actions to create posts
//   reviews.forEach((review) => {
//     const user = review.user; // Assuming each review has a reference to the user
//     const userReviews = user?.reviews?.slice() ?? []; // Create a copy of the user's reviews array


//     //   const latestReview = reviews[reviews.length - 1];
//     if (userReviews.length > 0) {
//       // Sort the reviews based on the createdAt property in descending order
//       userReviews.sort((a, b) => {
//         const dateA = new Date(a.createdAt).getTime();
//         const dateB = new Date(b.createdAt).getTime();
//         return dateB - dateA;
//       });

//       const latestReview = userReviews[0]; // Retrieve the latest review

//       const post = {
//         id: latestReview.id,
//         username: latestReview.username,
//         type: 'Reviews',
//         albumName: latestReview.albumName,
//         reviewText: latestReview.reviewText,
//         createdAt: latestReview.createdAt,
//       };

//       posts.push(post);
//     }
//   });

//   return (
//     <div>
//     <Navigation />
//     <h1>Feed Page</h1>
//     {reviews.length > 0 ? (
//       posts.map((post) => (
//         <div key={post.id}>
//           <h2>{post.username}</h2>
//           {post.type === 'Reviews' && (
//             <ul>
//               <li>
//                 {post.username} posted a review for {post.albumName}: {post.reviewText}
//               </li>
//             </ul>
//           )}
//         </div>
//       ))
//     ) : (
//       <p>No posts found.</p>
//     )}
//   </div>
// );
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

//   // Create an array to store individual posts
//   const posts = [];

//   // Merge all reviews from all users into a single array
//   const allReviews = users.flatMap((user) => user.reviews);

//   // Sort the merged array based on the reviews' createdAt property
//   const sortedReviews = allReviews.sort((a, b) => {
//     const dateA = new Date(a.createdAt);
//     const dateB = new Date(b.createdAt);

//     // Compare the dates
//     if (dateA > dateB) return -1;
//     if (dateA < dateB) return 1;
//     return 0;
//   });

//   // Iterate over the sorted reviews to create posts
//   sortedReviews.forEach((review) => {
//     const user = users.find((u) => u.reviews.some((r) => r.id === review.id));

//     const post = {
//       id: review.id,
//       username: user.username,
//       type: 'Reviews',
//       albumName: review.albumName,
//       reviewText: review.reviewText,
//       createdAt: review.createdAt,
//     };

//     posts.push(post);
//   });

//   return (
//     <div>
//       <Navigation />
//       <h1>Feed Page</h1>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h2>{post.username}</h2>
//           {post.type === 'Reviews' && (
//             <ul>
//               <li>
//                 {post.username} posted a review for {post.albumName}: {post.reviewText}
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
//   const { loading, error, data } = useQuery(QUERY_USERS);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error occurred: {error.message}</p>;
//   }

//   const users = data.users;

//   const posts = [];

//   users.forEach((user) => {

// const sortedReviews = [...user.reviews].sort((a, b) => {
//   const dateA = new Date(a.createdAt);
//   const dateB = new Date(b.createdAt);

//   // Compare the dates
//   if (dateA > dateB) return -1;
//   if (dateA < dateB) return 1;
//   return 0;
// });

//     sortedReviews.forEach((review) => {
//       const post = {
//         id: review.id,
//         username: user.username,
//         type: 'Reviews',
//         albumName: review.albumName,
//         reviewText: review.reviewText,
//         createdAt: review.createdAt,
//       };
//       posts.push(post);
//     });
//   });

//   // Reverse the posts array to display the most recent review at the top
//   posts.reverse();

//   return (
//     <div>
//       <Navigation />
//       <h1>Feed Page</h1>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h2>{post.username}</h2>
//           {post.type === 'Reviews' && (
//             <ul>
//               <li>
//                 {post.username} posted a review for {post.albumName}: {post.reviewText}
//               </li>
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };


// export default Feed;