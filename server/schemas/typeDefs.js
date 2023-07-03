const { gql } = require("apollo-server-express");
 
const typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    password: String!
    profilePicture: String
    listenedAlbums: [Album]
    wannaListenAlbums: [Album]
    reviews: [Review]
    followers: [User]
    following: [User]
  }

  type Album {
    id: ID
    createdAt: String
    artistName: String
    albumName: String
    albumPic: String
    releaseDate: String
  }

  type Review {
    id: ID
    createdAt: String
    albumName: String
    reviewText: String
    username: String
  }

  input AlbumInput {
    id: ID
    createdAt: String
    artistName: String
    albumName: String
    albumPic: String
    releaseDate: String
  }

  input AddReviewInput {
    id: ID
    createdAt: String
    albumName: String
    reviewText: String
    username: String  # Add this field to associate the user with the review
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
    profilePicture: String
  }

  input DeleteUserInput {
    id: ID!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User 
    users: [User]
    protected: User
    album(id: ID!): Album
    # reviews(id: ID!): Review
    reviews: [Review]  # Add this field to query all reviews
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    deleteUser(id: ID!, input: DeleteUserInput!): User
    loginUser(email: String!, password: String!): Auth
    addProfilePicture(_id: ID!, profilePicture: String!): User!
    addReview(input: AddReviewInput): User
    saveToListened(album: AlbumInput): User
    saveToWannaListen(album: AlbumInput): User
    addFollower(id: ID!): User
    # removeWannaListenAlbum(id: ID!): User
    # removeListenedAlbum(id: ID!): User
    # removeReview(id: ID!): User
    # deleteFollower(id: ID!): User
  }
`;

module.exports = typeDefs;
