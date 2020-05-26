import React, { Component } from "react";
import './AddUser.css';
import axios from "axios";

import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';

class AddUser extends Component {
  state = {
    name: "",
    genre: "",
    age: "",
    response: ""
  };
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  };
  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  addUser = async e => {
    e.preventDefault();
    try {
      const newUser = await axios.post("/api/users/", {
          name: this.refs.name.value,
          age: Number(this.refs.age.value),
          genre: this.refs.genre.value
        }
      );
      this.setState({ response: `User ${newUser.data.newUser.name} created!` });
    } catch (err) {
      this.setState({ response: err.message });
    }
  };
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage("");
  };
  render() {
    return (
      <div className="AddUser-Wrapper">
      <Chat
      handleNewUserMessage={this.handleNewUserMessage}
      title="Chat"
      subtitle="And my cool subtitle"
    />
        <h1>Add User:</h1>
        <form onSubmit={this.addUser}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="For example: Elon Musk"
            name="name"
            onChange={this.onChangeHandler}
            ref="name"
            className="Add-User-Input"
            required
            minLength="3"
            maxLength="33"
            id="name"
          />
          <label htmlFor="genre">Genre: <b>(must be Male or Female)</b></label>
          <input
            type="text"
            placeholder="Male or Female"
            name="genre"
            onChange={this.onChangeHandler}
            ref="genre"
            className="Add-User-Input"
            required
            minLength="3"
            maxLength="6"
            id="genre"
          />
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            placeholder="0 to 120"
            name="age"
            min="1"
            max="120"
            onChange={this.onChangeHandler}
            ref="age"
            className="Add-User-Input"
            required
            id="age"
          />
          <button type="submit" className="Add-User-Submit fa fa-plus"></button>
          <button type="reset" className="Add-User-Reset fa fa-eraser"></button>
        </form>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default AddUser;
