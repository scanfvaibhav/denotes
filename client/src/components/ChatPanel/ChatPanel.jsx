import React, { Component } from 'react'
import io from 'socket.io-client';
import { TextField } from '@material-ui/core';
import { List, ChatFrom } from  '../List';
import "./Chat.css";
import ComboSelect from 'react-combo-select';
import style from 'react-combo-select/style.css';

import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';


const { isEmpty } = require('lodash');


const socket = io();

class ChatPanel extends Component {
 
  constructor(props) {
    super(props);
    this.boxRef = React.createRef();
    this.state = {
      counters: [],
      text:"",
      from:"",
      to:"",
      typing:false,
      isTabActive:false,
      data :[
        {text: "Vaibhav", value: "singhvaibhav396@gmail.com"}
    ]
    };

  }

  
  componentDidMount() {
    addResponseMessage("Awsome");
    this.newMessage();
    
  }
  
  newMessage(){
    socket.on('newMessage',function(msg){
      addResponseMessage(msg.text);
    });
}




  

  handleNewUserMessage = (newMessage) => {
    socket.emit("message",{
      text: newMessage,
      from: sessionStorage.from,
      to: sessionStorage.to,
    });
  };
  
 
  
  handleToChange = (value,text) => {
    this.setState({ 
      "to": value });
  };
 
 

  render() {
    return (
      <Chat
      handleNewUserMessage={this.handleNewUserMessage}
      title="Chat"
      subtitle="And my cool subtitle"
    />
     
    );
  }
}

export default ChatPanel;