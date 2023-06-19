import React, { useState } from 'react';
import Navigation from "../components/Navigation.js";
// import axios from 'axios';
import { useMutation } from '@apollo/client';
import { SAVE_TO_WANNA_LISTEN, SAVE_TO_LISTENED, ADD_REVIEW } from "../utils/mutations";
// import "../styles/SearchForm.css"
import '../styles/SearchResultsPage.css'; // Add this line


const SearchResultsPage = () => {

const [saveToListened] = useMutation(SAVE_TO_LISTENED);
const [saveToWannaListen] = useMutation(SAVE_TO_WANNA_LISTEN);
const [addReview] = useMutation(ADD_REVIEW);

const [isModalOpen, setIsModalOpen] = useState(false);
const [reviewText, setReviewText] = useState('');
const [selectedAlbum, setSelectedAlbum] = useState(null);


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

  const handleAddReview = async (albumName, reviewText) => {
    try {
        await addReview({
          variables: {
            input: {
              albumName,
              reviewText
            }
          }
        });
      console.log('Review added successfully.');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const submitReview = () => {
    if (selectedAlbum) {
        handleAddReview(selectedAlbum.albumName, reviewText);
        closeModal();
      }
    };

const openModal = (album) => {
    console.log('Open modal called');
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setReviewText('');
    setSelectedAlbum(null);
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
              <button className="reviewBtn"onClick={() => openModal(album)}>
                Add Review
              </button>
            </div>
          ))}
           {isModalOpen && selectedAlbum && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Review For: {selectedAlbum.albumName}</h2>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              cols={50}
              className="mTextArea"
            />
            <button className="mButtons" onClick={submitReview}>Submit</button>
            <button className="mButtons" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
        </div>
      );
          };
      

export default SearchResultsPage;