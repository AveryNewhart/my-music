// const fetch = require('node-fetch');
require('isomorphic-fetch');


const getAlbumData = async (searchTerm) => {
    // const searchTerm = req.query.searchTerm; // Assuming the search term is provided as a query parameter

  const url = `https://theaudiodb.p.rapidapi.com/searchalbum.php?s=${encodeURIComponent(searchTerm)}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a07724306amsh845f95cb4166ea8p1978d1jsn1ef6eee14cbc',
      'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
    }
  };

try {
  const response = await fetch(url, options);
  const result = await response.json(); // Parse the response as JSON

  if (result.album) {
    // Extract the albums array from the result object
    const albums = result.album;

    return albums;
  } else {
    return []; // Return an empty array if no albums found
  }
} catch (error) {
  console.error(error);
  throw new Error('Error retrieving data from the third-party API.');
}
};

// const getArtists = async (searchTerm) => {
//   const url = `https://theaudiodb.p.rapidapi.com/search.php?s=${encodeURIComponent(searchTerm)}`;
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'a07724306amsh845f95cb4166ea8p1978d1jsn1ef6eee14cbc',
//       'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json(); // Parse the response as JSON

//     if (result.artists) {
//       // Extract the artists array from the result object
//       const artists = result.artist;

//       return artists;
//     } else {
//       return []; // Return an empty array if no artists found
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error retrieving data from the third-party API.');
//   }
// };

module.exports = {
  searchAlbums: getAlbumData
  // ,
  // getArtists: getArtists
};
