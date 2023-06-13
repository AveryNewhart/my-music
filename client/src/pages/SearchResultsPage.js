import React
// , { useState
from 'react';
import Navigation from "../components/Navigation.js";
// import SearchForm from './SearchForm';
// import SearchResultsComp from '../components/SearchResultsComp';

const SearchResultsPage = ({ albums }) => {
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearchResults = (results) => {
//     setSearchResults(results);

// const { searchResults } = location.state;
console.log(albums)

if (!albums || albums.length === 0) {
    return (
      <>
        <Navigation />
        <p>No Results Found.</p>
      </>
    );
  }

//   };
// if (!results) {
//     return <p>No Results Found.</p>
//   }

// console.log(results)
// console.log(result)

  return (
    <div>
      <Navigation />
          <h1>Search Results</h1>
      {albums.map((album) => (
        <div key={album.id} >
          <p>Artist: {album.artistName}</p>
          <img src={album.albumPic} alt="" className='coverArt' />
          <p>Album: {album.albumName}</p>
          <p>Release Date: {album.releaseDate}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;