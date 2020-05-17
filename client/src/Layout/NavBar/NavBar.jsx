import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
   <nav className="NavBar-Wrapper">
     <div>
       <h3 className="NavBar-Title">CHAT APP</h3>
     </div>
     <div className="NavBar-Links">
      <Link to="/" className="NavBar-Link">Chat</Link>
     </div>
   </nav>
  );
};

export default Home;