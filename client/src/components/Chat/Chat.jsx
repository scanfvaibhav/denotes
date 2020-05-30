import React, { Component } from 'react'
import io from 'socket.io-client';
import { TextField } from '@material-ui/core';
import { List, ChatFrom } from  '../List';
import "./Chat.css";
import ComboSelect from 'react-combo-select';
import style from 'react-combo-select/style.css';

import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';


const { isEmpty } = require('lodash');
const maxHeightProps = {
  scrollMaxHeight: 100, // number
  preferredDirection: 'down' // 'top' | 'down'
};

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


    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.socketInit = this.socketInit.bind(this);
    this.updateTyping = this.updateTyping.bind(this);
  }

  componentDidMount() {
    this.socketInit();
    window.addEventListener("focus", this.onTabFocus(true));
    addResponseMessage("Welcome to this awesome chat!");
  }
  
  

componentWilUnmount() {
    window.removeEventListener("focus", this.onTabFocus(false))
}

onTabFocus = (value) => {
    this.setState({isTabActive:value});
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
  
  handleToChange = (value,text) => {
    this.setState({ 
      "to": value });
  };
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
        read : this.state.isTabActive,
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
        from:JSON.parse(localStorage.userInfo).email,
        to:this.state.to
    });
  }
  
  socketInit(){
    socket.on("newMessage", data => {
    this.setState({"chat":data});
    //this.newMsg(data);
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
handleNewUserMessage = (newMessage) => {
  // Now send the message throught the backend API
  addResponseMessage(newMessage);
}
newMsg (msg){
  addResponseMessage(msg);
}
  render() {
    return (
        <div>
        <div>
       

        <iframe src="https://powerva.microsoft.com/webchat/bots/34edd72c-5381-4c7c-9d00-572955c84eb9"></iframe>
        <Chat
      handleNewUserMessage={this.handleNewUserMessage}
      addUserMessage={this.state.chat}
      title="Chat"
      subtitle="And my cool subtitle"
    />
        </div>    
        <div className="users">

            <div>
            <ComboSelect style={style}
            type="select" 
            data={this.state.data} 
            id="standard-dense"
          value={this.state.to}
          name="to"
          label="To"
          map={{text: 'text', value: 'value'}}
          onChange={this.handleToChange}
            {...maxHeightProps} />
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
             
                      <button onClick={this.sendSocketIO}>Send</button>
                </div>
            </div>

        </div>
       
        </div>
     
    );
  }
}

export default ChatPanel;