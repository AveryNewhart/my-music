import React from 'react';
import Navigation from "../components/Navigation.js";
import "../styles/SearchForm.css"


const SearchResultsPage = () => {
    // Retrieve the search results from the query parameters
  const searchResults = JSON.parse(new URLSearchParams(window.location.search).get('searchResults'));

console.log(searchResults)

if (!searchResults || searchResults.length === 0) {
    return (
      <>
        <Navigation />
        <p>No Results Found.</p>
      </>
    );
  }

  return (
    <div>
      <Navigation />
          <h1>Search Results</h1>
      {searchResults.map((album, index) => (
     <div key={index} className="albumInside">
     <p>Artist: {album.artistName}</p>
     <img src={album.albumPic} alt="" className='coverArt'/>
     <p>Album: {album.albumName}</p>
     <p>Release Date: {album.releaseDate}</p>
     <div>
     <button variant="primary" className="" 
     // onClick={() => handleSaveToWatched(movie.id)}
     >
       Save to Listened</button>
     <button variant="primary" className="" 
     // onClick={() => handleSaveToWatchlist(movie.id)}
     >Save to Wanna Listen</button>
     </div>
     <button className='reviewBtn'>Add Review</button>
   </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;