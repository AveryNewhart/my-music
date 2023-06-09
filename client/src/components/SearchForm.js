import React, { useState } from 'react';
// import { searchAlbums } from '...server/api'; // Update the import statement to match your file path
import { searchAlbums } from '../api/api';
import "../styles/SearchForm.css"


const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState([]);

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
        const albumData = albums.map(album => ({
          artistName: album.strArtist,
          albumName: album.strAlbum,
          releaseDate: album.intYearReleased,
          albumPic: album.strAlbumThumb
        }));
  
        setResult(albumData);



      // const albumDetails = `Title: ${albumTitle}\nArtist: ${artistName}\nYear Released: ${yearReleased}`;
      // setResult(albums);
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
      {/* <div>{result}</div> */}
      <div>
      {result.map((album, index) => (
          <div key={index}>
            <p>Artist: {album.artistName}</p>
            <p>Album: {album.albumName}</p>
            <p>Release Date: {album.releaseDate}</p>
            <img src={album.albumPic} alt="" className='coverArt'/>
            {/* <image alt=''>{album.albumPic}</image> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;