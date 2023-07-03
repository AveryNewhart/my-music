import React, { useState
  // , useEffect 
} from 'react';
import { searchAlbums
  // , getArtists
 } from '../api/api';
import "../styles/SearchForm.css"
 

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [artists, setArtists] = useState([]);
  // const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {
  //   fetchArtists(searchInput);
  // }, [searchInput]);

  // useEffect(() => {
  //   filterSuggestions();
  // }, [searchInput, artists]);


  // const fetchArtists = async (searchTerm) => {
  //   try {
  //     const fetchedArtists = await getArtists(searchTerm);
  //     console.log(fetchedArtists); // Add this line to check the value
  //     setArtists(fetchedArtists || []);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

  // const filterSuggestions = () => {
  //   if (artists.length > 0) {
  //     const filteredArtists = artists.filter((artist) => {
  //       // const artistName = artist.strArtist ? artist.strArtist.toLowerCase() : '';
  //       const artistName = artist.strArtist || '';
  //       const searchValue = searchInput.toLowerCase();
  //       return artistName.includes(searchValue) || artistName.startsWith(searchValue);
  //     });
  
  //     console.log(filteredArtists); // Add this line to check the value of filteredArtists
  //     setSuggestions(filteredArtists);
  //   }
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
    } catch (error) {
      console.error(error);
      // setResult('Error retrieving album data.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '10px' }}
      />
        {/* {searchInput && suggestions.length > 0 && (
  <ul>
    {suggestions.map((artist, index) => (
      <li key={index} onClick={() => setSearchInput(artist.strArtist)}>
        {artist.strArtist}
      </li>
    ))}
  </ul>
)} */}
      <button className="profBut searchBut" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm;