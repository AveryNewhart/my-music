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
  }

#!! //! make sure to add the mutations for adding reviews, saving music, etc.

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    deleteUser(id: ID!, input: DeleteUserInput!): User
    loginUser(email: String!, password: String!): Auth
    addProfilePicture(_id: ID!, profilePicture: String!): User!
    # addReview(albumId: ID!, reviewText: String!): Album
    saveToListened(album: AlbumInput): User
    saveToWannaListen(albumId: ID): User
  }
`;


module.exports = typeDefs;