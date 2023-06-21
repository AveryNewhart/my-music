import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import Navigation from '../components/Navigation';

const Feed = () => {
  const { loading, error, data } = useQuery(QUERY_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  const users = data.users;

  const posts = [];

  users.forEach((user) => {
   // Create a new sorted array based on the reviews' createdAt property
   const sortedReviews = [...user.reviews].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

    sortedReviews.forEach((review) => {
      const post = {
        id: review.id,
        username: user.username,
        type: 'Reviews',
        albumName: review.albumName,
        reviewText: review.reviewText,
        createdAt: review.createdAt,
      };
      posts.push(post);
    });
  });

  // Reverse the posts array to display the most recent review at the top
  posts.reverse();

  return (
    <div>
      <Navigation />
      <h1>Feed Page</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.username}</h2>
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
  );
};


export default Feed;