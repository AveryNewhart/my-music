import React from 'react'
// import "../styles/App.css"
import "../styles/Home.css"
// import Navigation from "../components/Navigation"
 
export default function Home() {
  return (
    <div className=''>
      {/* <Navigation /> */}
        <h1>My Music</h1>
        <a href="/login" className="login">
              Login/Create
          </a>
          <br></br>
          <a href="/profile" className="login">
              View Profile
          </a>
          <br></br>
          <a href="/feed" className="login">
              View Feed
          </a>
      
    </div>
  )
}