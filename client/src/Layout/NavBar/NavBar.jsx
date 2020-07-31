import React, { useState, Fragment } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Chatbox from '../../components/Chatbox/Chatbox';
import { AutoComplete } from 'primereact/autocomplete';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';



const Home = () => {
  //<Link to="/Chat" className="NavBar-Link">Chat</Link>
  //<Chatbox/>

  //<Link to="/Add" className="NavBar-Link">Add</Link>
  //<Link to="/Edit" className="NavBar-Link">Edit</Link>

  const [brand,setBrand]=useState();
  const [brandSuggestions,setBrandSuggestions]=useState(['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo']);

  let suggestBrands=(event)=>{
    let results = brandSuggestions.filter((brand) => {
      return brand.toLowerCase().startsWith(event.query.toLowerCase());
  });

  setBrand(results);
}

  return (
   <nav className="NavBar-Wrapper">
     <div>
       <h3 className="NavBar-Title">Denotes</h3>
     </div>
     {localStorage.getItem("userInfo")?<Fragment>
     <div className="NavBar-Links">
      <Link to="/" className="NavBar-Link">Home</Link>
      <Link to="/Write" className="NavBar-Link">Write</Link>
      
     </div>
     <div className="NavBar-search">
     <AutoComplete 
      size={50}
      value={brand} 
      onChange={(e) => setBrand( e.value)}
      suggestions={brandSuggestions}
      completeMethod={suggestBrands} 
      />
     </div></Fragment>:null}
     
   </nav>
  );
};

export default Home;