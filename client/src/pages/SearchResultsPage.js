import React, { useState } from 'react';
import Navigation from "../components/Navigation.js";
// import axios from 'axios';
import { useMutation } from '@apollo/client';
import { SAVE_TO_WANNA_LISTEN, SAVE_TO_LISTENED } from "../utils/mutations";
import "../styles/SearchForm.css"
import '../styles/SearchResultsPage.css'; // Add this line


const SearchResultsPage = () => {

const [saveToListened] = useMutation(SAVE_TO_LISTENED);
const [saveToWannaListen] = useMutation(SAVE_TO_WANNA_LISTEN);

const [isModalOpen, setIsModalOpen] = useState(false);
const [reviewText, setReviewText] = useState('');


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

    try {
        await saveToListened({
          variables: {
            album: {
              artistName: album.artistName,
              albumName: album.albumName,
              releaseDate: album.releaseDate,
              albumPic: album.albumPic,
            }
          }
        });
    
        console.log('Album saved to "Listened".');
      } catch (error) {
        console.error('Error saving album to "Listened":', error);
      }
  };

  const handleSaveToWannaListen = async (album) => {
    try {
        await saveToWannaListen({ variables: {
            album: {
              artistName: album.artistName,
              albumName: album.albumName,
              releaseDate: album.releaseDate,
              albumPic: album.albumPic,
            }
          }
        });
        console.log('Album saved to "Wanna Listen".');
      } catch (error) {
        console.error('Error saving album to "Wanna Listen":', error);
      }
  };

  const submitReview = () => {
    // Perform any necessary actions with the review text
    console.log('Review submitted:', reviewText);
  
    // Close the modal
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setReviewText('');
  };
  

    return (
        <div>
          <Navigation />
          <h1>Search Results</h1>
          {searchResults.map((album, index) => (
            <div key={index} className="albumInside">
              <p>Artist: {album.artistName}</p>
              <img src={album.albumPic} alt="" className="coverArt" />
              <p>Album: {album.albumName}</p>
              <p>Release Date: {album.releaseDate}</p>
              <div>
                <button
                  variant="primary"
                  className=""
                  onClick={() => handleSaveToListened(album)}
                >
                  Save to Listened
                </button>
                <button
                  variant="primary"
                  className=""
                  onClick={() => handleSaveToWannaListen(album)}
                >
                  Save to Wanna Listen
                </button>
              </div>
              <button className="reviewBtn" onClick={openModal}>
                Add Review
              </button>
            </div>
          ))}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Add Review</h2>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  cols={50}
                />
                <button onClick={submitReview}>Submit</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      );
          };
      

export default SearchResultsPage;