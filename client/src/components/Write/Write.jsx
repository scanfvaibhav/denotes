import React, { Component } from "react";
import '../AddUser/AddUser.css';
import axios from "axios";

class Write extends Component {
  state = {
    title: "",
    description: "",
    details: {name:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).name:""}
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
        <h1>Add User:</h1>
        <form onSubmit={this.addPost}>
          <label htmlFor="title">Title:</label>
          <input 
            type="text"
            placeholder="For example: linked list"
            name="title"
            onChange={this.onChangeHandler}
            ref="title"
            className="Add-User-Input"
            minLength="3"
            maxLength="100"
            id="title"
          />
          <label htmlFor="description">description</label>
          <input
          type="text"
          placeholder=""
          name="description"
          onChange={this.onChangeHandler}
          ref="description"
          className="Add-User-Input"
          required
          minLength="3"
          maxLength="100"
          id="description"
        />
         
          <button type="submit" className="Add-User-Submit fa fa-plus"></button>
          <button type="reset" className="Add-User-Reset fa fa-eraser"></button>

       </form>

        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default Write;
