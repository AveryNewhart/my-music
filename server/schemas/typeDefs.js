const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  input CreateUserInput {
    email: String!
    username: String!
    password: String!
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
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    deleteUser(id: ID!, input: DeleteUserInput!): User
    loginUser(email: String!, password: String!): Auth
  }
`;


module.exports = typeDefs;