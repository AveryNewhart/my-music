const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
// const api = require('./api');
const bodyParser = require('body-parser');

const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// const PORT = process.env.PORT || 3001;
const app = express();

// Increase the limit to 10MB
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/api/albums', api.getAlbumData);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}



// //This will create a middleware.
// //When you navigate to the root page, it would use the built react-app
// app.use(express.static(path.resolve(__dirname, "./client/build")));

// app.use(routes); //! We do not need this

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
