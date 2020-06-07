import React, { Component } from 'react';
import './Chat.css';
import Profile from '../Profile/Profile';
import  "../Posts/Posts.css";
import {getMessages} from "../../service/BaseService"; 

import "../../Layout/Home/Home.css";
import axios from "axios";
import { GridLoader } from 'react-spinners';
// Components
import User from "../User/User";
import SearchUsers from "../SearchUsers/SearchUsers";

class ChatPanel extends  Component{
 
 
  state = {
    data:this.props.data,
    allUsers: null,
    error: ""
  };

  async componentDidMount() {
    let email=localStorage.userInfo?JSON.parse(localStorage.userInfo).email:"";
    if(email){
      try {
        getMessages(this,email).then((res)=>{
          if(res){
            this.setState({data:res.data.chats});
          }
        }).catch();
      } catch (err) {
        this.setState({ error: err.message });
      }
  }
  try {
    const users = await axios("/api/users/");
    this.setState({ friends: users.data });
  } catch (err) {
    this.setState({ error: err.message });
  }

  }

  removeUser = async id => {
    try {
      const users = await axios("/api/users/");
      this.setState({ data: users.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchUsers = async username => {
    let allUsers = [...this.state.data.users];
    if (this.state.allUsers === null) this.setState({ allUsers });

    let users = this.state.data.users.filter(({ name }) =>
      name.toLowerCase().includes(username.toLowerCase())
    );
    if (users.length > 0) this.setState({ data: { users } });

    if (username.trim() === "")
      this.setState({ data: { users: this.state.allUsers } });
  };

render() {


  let columnModel = [{"text":"Messages","index":"text"},
  {"text":"From","index":"text"},
  {"text":"Date","index":"date"}];
  let friendModel = [{"text":"Name","index":"name"},{"text":"Status","index":"status"}];
  let Header  = columnModel.map(function(cm){
    return <th>{cm.text}</th>
  });
  let msgs;
  let friends;

  if (this.state.data)
    msgs =
      this.state.data &&
      this.state.data.map(data => (
        <User key={data._id} columnModel={columnModel} data={data} />
      ));
  else return <div className="Spinner-Wrapper"> <GridLoader color={'#333'} /> </div>;

  friends = this.state.friends && 
        this.state.friends.users.map(data =>(
          <User key={data._id} columnModel={friendModel} data={data} />
        ));

  if (this.state.error) return <h1>{this.state.error}</h1>;
  if (this.state.data !== null)
    if (!this.state.data.length)
      return <h1 className="No-Users">No users!</h1>;

        return (

          <div className="container">
       
    <div className="left-col">
    <table className="Table">
          <tbody>{friends}</tbody>
        </table>
  
    </div>
    
    <div className="center-col">
    <div className="Table-Wrapper">
        
        <SearchUsers searchUsers={this.searchUsers} />
        <table className="Table">
          <thead>
            <tr>
            {Header}
            </tr>
          </thead>
          <tbody>{msgs}</tbody>
        </table>
      </div>
        
    </div>
    
    <div className="right-col">
     
    <Profile data={this.state.userData}/>
    </div>
  </div>);  
  }  
} 
export default ChatPanel;