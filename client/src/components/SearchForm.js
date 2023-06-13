import React, { useState } from 'react';
// import { searchAlbums } from '...server/api'; // Update the import statement to match your file path

import { searchAlbums } from '../api/api';
import "../styles/SearchForm.css"


const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [result, setResult] = useState([]);

  // const handleSearch = () => {
  //   fetch(`/api/albums?searchTerm=${encodeURIComponent(searchTerm)}`)
  //     .then((response) => response.text())
  //     .then((data) => setResult(data))
  //     .catch((error) => console.error(error));
  // };
  const handleSearch = async () => {
    try {
      const albums = await searchAlbums(searchTerm);
      console.log(albums); // Add this line to check the value
        // Extract the required information from the albums object
        const searchResults = albums.map(album => ({
          artistName: album.strArtist,
          albumName: album.strAlbum,
          releaseDate: album.intYearReleased,
          albumPic: album.strAlbumThumb
        }));
  
        // setResult(albumData);
        onSearch(searchResults); // Pass the search results to the onSearch function
        setSearchTerm('')
        // window.location.href = '/searchedresults'

      // const albumDetails = `Title: ${albumTitle}\nArtist: ${artistName}\nYear Released: ${yearReleased}`;
      // setResult(albums);
    } catch (error) {
      console.error(error);
      // setResult('Error retrieving album data.');
    }
  };

  return (
    <div>
            <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm;