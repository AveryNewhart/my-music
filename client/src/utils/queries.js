import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    id
    username
    email
    profilePicture
    listenedAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        createdAt
        # Add any additional fields you need from the listenedAlbums
        # ...
      }
      wannaListenAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        createdAt
        # Add any additional fields you need from the wannaListenAlbums
        # ...
      }
      reviews {
        id
        albumName
        reviewText
        createdAt
      }
      followers {
        id
        username
      }
      following {
        id
        username
      }
  }
}
`;

export const QUERY_USERS = gql`
  query {
    users {
      id
      username
      email
      profilePicture
      listenedAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        createdAt
        # Add any additional fields you need from the listenedAlbums
        # ...
      }
      wannaListenAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        createdAt
        # Add any additional fields you need from the wannaListenAlbums
        # ...
      }
      reviews {
        id
        albumName
        reviewText
        createdAt
      }
      followers {
        id
        username
      }
      following {
        id
        username
      }
    }
  }
`;


export const QUERY_PROTECTED = gql`
query protected {
  protected {
    id
    username
    email
    profilePicture
    listenedAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        # Add any additional fields you need from the listenedAlbums
        # ...
      }
      wannaListenAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        # Add any additional fields you need from the wannaListenAlbums
        # ...
      }
      reviews {
        id
        albumName
        reviewText
      }
      followers {
        id
        username
      }
      following {
        id
        username
      }
  }
}
`;
 
export const QUERY_REVIEWS = gql`
  query {
    reviews {
      id
      createdAt
      albumName
      reviewText
      username
    }
  }
`;
