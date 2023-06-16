import React from 'react';
import Navigation from "../components/Navigation.js";
// import axios from 'axios';
import { useMutation } from '@apollo/client';
import { SAVE_TO_WANNA_LISTEN, SAVE_TO_LISTENED } from "../utils/mutations";
import "../styles/SearchForm.css"


const SearchResultsPage = () => {

const [saveToListened] = useMutation(SAVE_TO_LISTENED);
const [saveToWannaListen] = useMutation(SAVE_TO_WANNA_LISTEN);

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

  const handleSaveToListened = async (album) => {
    //! WITH THIS CODE THE FETCH REQUEST PASSES BUT THE NEEDED DATA ISNT BEING RETURNED
    // try {
    //     await saveToListened({ variables: { albumId: album.id } });
    //     console.log('Album saved to "Listened".');
    //   } catch (error) {
    //     console.error('Error saving album to "Listened":', error);
    //   }

    // const albumId = {
    //     artistName: album.artistName,
    //     albumName: album.albumName,
    //     releaseDate: album.releaseDate,
    //   };

    //! WITH THIS CODE THE PAYLOAD RETURNS THE NEEDED DATA BUT THE FETCH FAILS
    try {
        await saveToListened({ variables: { albumId: album } });
        console.log('Album saved to "Listened".');
      } catch (error) {
        console.error('Error saving album to "Listened":', error);
      }
  };

  const handleSaveToWannaListen = async (album) => {
    const albumId = {
        artistName: album.artistName,
        albumName: album.albumName,
        releaseDate: album.releaseDate,
      };

    try {
        await saveToWannaListen({ variables: { albumId } });
        console.log('Album saved to "Wanna Listen".');
      } catch (error) {
        console.error('Error saving album to "Wanna Listen":', error);
      }
  };

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
        <button variant="primary" className="" onClick={() => handleSaveToListened(album)}>
              Save to Listened
            </button>
        <button variant="primary" className="" onClick={() => handleSaveToWannaListen(album)}>
              Save to Wanna Listen
            </button>
     </div>
     <button className='reviewBtn'>Add Review</button>
   </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;