import React, { Component } from "react";
import '../AddUser/AddUser.css';
import axios from "axios";
import Login from '../Login/Login';

class Write extends Component {
  state = {
    title: "",
    description: "",
    details: {name:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).name:""},
    user:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  addPost = async e => {
    e.preventDefault();
    try {
      const newUser = await axios.post("/api/post/create", {
          title: this.refs.title.value,
          description: this.refs.description.value,
          details: this.state.details
        }
      );
      this.setState({ response: `User ${newUser.data.newUser.name} created!` });
    } catch (err) {
      this.setState({ response: err.message });
    }
  };

  render() {
    return (
      <div className="AddUser-Wrapper">
        <h1>Write your thoughts:</h1>
        {this.state.user?<form onSubmit={this.addPost}>
          <textarea 
            type="text"
            placeholder="Title"
            name="title"
            onChange={this.onChangeHandler}
            ref="title"
            className="Add-User-Input"
            minLength="3"
            maxLength="100"
            id="title"
          />
          <textarea
          type="text"
          placeholder="Content"
          name="description"
          onChange={this.onChangeHandler}
          ref="description"
          className="Add-User-Input"
          required
          minLength="3"
          maxLength="1000000"
          id="description"
        />
         
          <button type="submit" className="Add-User-Submit fa fa-plus"></button>
          <button type="reset" className="Add-User-Reset fa fa-eraser"></button>

       </form>:<Login/>}

        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default Write;
