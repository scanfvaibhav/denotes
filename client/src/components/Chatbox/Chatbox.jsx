import React, { Component } from 'react'
import io from 'socket.io-client';
import "./Chat.css";

import { Chat, addResponseMessage } from 'react-chat-popup';




const socket = io();

class Chatbox extends Component {
 
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

export default Chatbox;