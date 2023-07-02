import React from 'react'
// import "../styles/App.css"
import "../styles/Home.css"
import Navigation from "../components/Navigation"
 
export default function Home() {
  return (
    <>
     <Navigation />
    <div className='home-container'>
    <h1 className='home-head'>Welcome to My Music</h1>
    <h3 className='home-head-3'> Discover, save, and share your favorite music with My Music.</h3>
    <p className='home-subtitle'>Explore their albums, save your favorites, write reviews, and connect with other music lovers.</p>
    <p className='home-subtitle'>My Music is the ultimate platform for music discovery and sharing.</p>
  </div>
  </>
  )
}