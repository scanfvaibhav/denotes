import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Chatbox from '../../components/Chatbox/Chatbox';

const Home = () => {
  //<Link to="/Chat" className="NavBar-Link">Chat</Link>
  //<Chatbox/>

  //<Link to="/Add" className="NavBar-Link">Add</Link>
  //<Link to="/Edit" className="NavBar-Link">Edit</Link>

  return (
   <nav className="NavBar-Wrapper">
     <div>
       <h3 className="NavBar-Title">Denotes</h3>
     </div>
     <div className="NavBar-Links">
      <Link to="/" className="NavBar-Link">Home</Link>
      <Link to="/Write" className="NavBar-Link">Write</Link>
      
     </div>
   </nav>
  );
};

export default Home;