const { gql } = require("apollo-server-express");

//! HAVE TO CREATE THE types AND inputs for music, reviews, saved music. 

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
  }

  type Album {
    id: ID
    artistName: String
    albumName: String
    albumPic: String
    releaseDate: String
  }

  input AlbumInput {
    id: ID
    artistName: String
    albumName: String
    albumPic: String
    releaseDate: String
  }

  type Review {
  id: ID
  albumName: String
  reviewText: String
}

input AddReviewInput {
  id: ID
  albumName: String
  reviewText: String
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
    reviews(id: ID!): Review
  }

#!! //! make sure to add the mutations for adding reviews, saving music, etc.

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    deleteUser(id: ID!, input: DeleteUserInput!): User
    loginUser(email: String!, password: String!): Auth
    addProfilePicture(_id: ID!, profilePicture: String!): User!
    addReview(input: AddReviewInput): User
    saveToListened(album: AlbumInput): User
    saveToWannaListen(album: AlbumInput): User
  }
`;


module.exports = typeDefs;