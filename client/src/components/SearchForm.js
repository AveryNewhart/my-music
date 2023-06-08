import React, { useState } from 'react';
// import { searchAlbums } from '...server/api'; // Update the import statement to match your file path
import { searchAlbums } from '../api/api';


const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');

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
      // const albumTitle = albums.strAlbum; // Access the album title
      // const artistName = albums.strArtist; // Access the artist name
      // const yearReleased = albums.intYearReleased; // Access the year released

          // Log the properties of the albums object
    // console.log('Album Title:', albums.strAlbum);
    // console.log('Artist Name:', albums.strArtist);
    // console.log('Year Released:', albums.intYearReleased);
      // ...and so on

      // const albumDetails = `Title: ${albumTitle}\nArtist: ${artistName}\nYear Released: ${yearReleased}`;
      setResult(albums);
    } catch (error) {
      console.error(error);
      setResult('Error retrieving album data.');
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
      <div>{result}</div>
    </div>
  );
};

export default SearchForm;