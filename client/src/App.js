import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, 
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { Switch } from 'react-router-dom';
// import './styles/App.css';
// import AuthService from './utils/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Signup from './pages/Signup';
import SearchResultsPage from './pages/SearchResultsPage';
// import EditProfile from "./pages/EditProfile";


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-vh-100 main-div'>
          <div>
            <Routes>
            <Route 
                path="/"
                element={<Home />}
              />
                 <Route 
                path="/login"
                element={<Login />}
              />
                    <Route 
                path="/profile"
                element={<Profile />}
              />
                      <Route 
                path="/feed"
                element={<Feed />}
              />
                          <Route 
                path="/signup"
                element={<Signup />}
              />
                                        <Route 
                path="/searchedresults"
                element={<SearchResultsPage />}
              />
            </Routes>
            {/* <Route path="/editprofile/:profileId" element={<EditProfile />} /> */}
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
