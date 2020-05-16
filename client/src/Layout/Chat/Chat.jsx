import React, { Component } from 'react';
import 'whatwg-fetch';
import io from 'socket.io-client';
import { TextField} from '@material-ui/core';
import {List, ChatFrom} from  '../../components/List'
import "./Chat.css";

const { isEmpty } = require('lodash');

const socket = io();
var interval;
var isTabActive=false;


class Chat extends Component {
 
  constructor(props) {
    super(props);
    this.boxRef = React.createRef();
    this.state = {
      counters: [],
      text:"",
      from:"",
      to:"",
      typing:false
    };


    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.socketInit = this.socketInit.bind(this);
    this.updateTyping = this.updateTyping.bind(this);
  }

  componentDidMount() {
    this.socketInit();
    window.addEventListener("focus", this.onTabFocus(true))
  }

 

componentWilUnmount() {
    window.removeEventListener("focus", this.onTabFocus(false))
}

onTabFocus = (value) => {
    isTabActive = value;
    this.sendReceipt();
}

  
onBlur = async (e) => {
  await socket.emit('typing', {
      typing:false,
      from:this.state.from,
      to:this.state.to
  });
}
onFocus = async (e) => {
  await socket.emit('typing', {
      typing:true,
      from:this.state.from,
      to:this.state.to
  });
}
  
  handleTextChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  scrollChatToBottom() {
    this.boxRef.current.scrollTop = this.boxRef.current.scrollHeight;

  }
  async sendReceipt(){
    await socket.emit('receipt', 
    {
        received :  true,
        read : isTabActive,
        from:this.state.from,
        to:this.state.to
    });
  }
  async sendSocketIO() {
    await socket.emit('message', 
    {
        newMsg:{
            text:this.state.text
        },
        from:this.state.from,
        to:this.state.to
    });
  }
  
  socketInit(){
    socket.on("newMessage", data => {
    this.setState({"chat":data});
    this.scrollChatToBottom();
    this.sendReceipt();
    });

    socket.on("typing", data => {
      if(data.name===this.state.to){
        this.updateTyping(data.typing);
      }else{
        this.updateTyping(false);
      }
    });
}
updateTyping(value){
  this.setState({"typing":value});
}

  render() {
    return (
        <div>
            <div className="users">
            <div>
            <TextField
            id="standard-dense"
            value={this.state.from}
            name="from"
            label="from"
            onChange={this.handleChange}
          /> 
          <TextField
          id="standard-dense"
          value={this.state.to}
          name="to"
          label="To"
          onChange={this.handleChange}
        />
                <div className="chatPanel" ref={this.boxRef}>
                <List>
                    {!isEmpty(this.state.chat) ?this.state.chat.map(({ from, to, text,  read, sent, received }, key) => (
                        <ChatFrom key={key} text={text} my={from===this.state.from} received={received} read={read} sent={sent}/>
                    )):null}
                    <p className="typing">{this.state.typing?"Typing...":null}</p>
                </List>
                </div>
               
                <div className="chat">
                <TextField
                id="standard-dense"
                value={this.state.text}
                name="text"
                onChange={this.handleTextChange}
                onFocus={this.onFocus} 
                onBlur={this.onBlur}
              />  
             
                      <button onClick={this.sendSocketIO}>Send Socket.io</button>
                </div>
            </div>

        </div>
       
        </div>
     
    );
  }
}

export default Chat;