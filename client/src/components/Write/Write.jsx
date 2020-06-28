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
          description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
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
        <form className='editor' onSubmit={this.addPost}>
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
          onEditorStateChange={this.onEditorStateChange}
          ref="description"
          required
          minLength="3"
          maxLength="1000000"
          id="description"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
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
function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}

export default Write;
