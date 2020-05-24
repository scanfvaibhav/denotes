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
      <Link to="/" className="NavBar-Link">Home</Link>
      <Link to="/Chat" className="NavBar-Link">Chat</Link>
      <Link to="/Add" className="NavBar-Link">Add</Link>
      <Link to="/Edit" className="NavBar-Link">Edit</Link>
     </div>
   </nav>
  );
};

export default Home;