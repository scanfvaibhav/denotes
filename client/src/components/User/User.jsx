import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';

const User = ({ _id, columnModel, data, removeUser }) => {

  let column=columnModel.map(function(val){
    if(val.type && val.type=="actions"){

      return <td>
      <button onClick={ () => removeUser(_id) } className="Action-Button fa fa-trash"></button>
      <Link to={{ pathname: '/edit', search: _id }}>
       <button className="Action-Button fa fa-pencil"></button>
      </Link>
    </td>

    } else{
      
      return <td>{data[val.index]}</td>
    }
  });

  return(
    <tr>{column}
      
    </tr>
  );
};

export default User;