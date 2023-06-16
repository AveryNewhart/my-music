import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        email
        password
      }
    }
  }
`;
 
export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        username
        email
        profilePicture
      }
      token
    }
  }
`;

// export const UPDATE_USER = gql`
//   mutation updateUser(
//     $_id: ID!
//     $email: String!
//     $username: String!
//     $phoneNumber: String!
//   ) {
//     updateUser(
//       _id: $_id
//       email: $email
//       username: $username
//       phoneNumber: $phoneNumber
//     ) {
//       _id
//       email
//       username
//       phoneNumber
//     }
//   }
// `;

export const ADD_PROFILE_PICTURE = gql`
  mutation addProfilePicture(
    $addProfilePictureId: ID!
    $profilePicture: String!
  ) {
    addProfilePicture(
      _id: $addProfilePictureId
      profilePicture: $profilePicture
    ) {
      profilePicture
    }
  }
`;

// Define the mutation for saving to "Watched" list
export const SAVE_TO_LISTENED = gql`
  mutation saveToListened($albumId: ID) {
    saveToListened(albumId: $albumId) {
      # // Return any data you need after saving to "Watched"
      # // For example, you can return the updated user or album data
      # // Here we assume the mutation returns the updated user
      username
      id
      listenedAlbums {
        # // Include the fields you need
        id
        albumName
        artist
        albumPic
        releaseDate
      }
    }
  }
`;

// Define the mutation for saving to "Wanna Listen" list
export const SAVE_TO_WANNA_LISTEN = gql`
  mutation SaveToWannaListen($albumId: ID) {
    saveToWannaListen(albumId: $albumId) {
      # // Return any data you need after saving to "Wanna Listen"
      # // For example, you can return the updated user or album data
      # // Here we assume the mutation returns the updated user
      username
      id
      wannaListenAlbums {
        # // Include the fields you need
        id
        albumName
        artist
        albumPic
        releaseDate
      }
    }
  }
`;
