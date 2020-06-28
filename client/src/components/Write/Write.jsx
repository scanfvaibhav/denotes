import React, { Component } from "react";
import '../AddUser/AddUser.css';
import axios from "axios";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

class Write extends Component {
  state = {
    title: "",
    editorState: EditorState.createEmpty(),
    details: {name:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).name:""}
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  addPost = async e => {
    e.preventDefault();
    try {
      const newUser = await axios.post("/api/post/create", {
          title: this.refs.title.value,
          description: draftToHtml(convertToRaw(this.refs.description.value)),
          details: this.state.details
        }
      );
      this.setState({ response: `User ${newUser.data.newUser.name} created!` });
    } catch (err) {
      this.setState({ response: err.message });
    }
  };
  onEditorStateChange =(editorState) =>{
    this.setState({
      editorState,
    });
  }
  render() {
    return (
      <div className="container">
       
    <div className="left-col">
    
    </div>
    
    <div className="center-col">
    <div className="AddUser-Wrapper">
        <h1>Write your thoughts:</h1>
        <form onSubmit={this.addPost}>
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
          <Editor
          placeholder="Content"
          name="description"
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          className="Add-User-Input"
          onEditorStateChange={this.onEditorStateChange}
          ref="description"
          className="Add-User-Input"
          required
          minLength="3"
          maxLength="1000000"
          id="description"
        />
          
         
          <button type="submit" className="Add-User-Submit fa fa-plus"></button>
          <button type="reset" className="Add-User-Reset fa fa-eraser"></button>

       </form>

        <p>{this.state.response}</p>
      </div>
    </div>
    
    <div className="right-col">
    </div>
  </div>
      
    );
  }
}

export default Write;
