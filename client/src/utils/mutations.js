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
