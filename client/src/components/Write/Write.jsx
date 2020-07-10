import React, { Component } from "react";
import {getPosts,getTree} from "../../service/BaseService"; 
import '../AddUser/AddUser.css';
import axios from "axios";
import { EditorState, convertToRaw ,convertFromHTML,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import {Treebeard} from 'react-treebeard';


class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      details: {name:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).name:""},
      posts:[],
      treeData:[] 
    };
    this.onToggle = this.onToggle.bind(this);
  }
  componentDidMount(){
    getPosts(this).then((res)=>{
      if(res){
        this.setState({posts:res.data.posts});
      }
      getTree(this).then((res)=>{
        if(res){
          this.setState({treeData:res.data});
        }
      }).catch();
    }).catch();
    
    
  }

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  addPost = async e => {
    e.preventDefault();
    try {
      const newUser = await axios.post("/api/post/create", {
          title: this.refs.title.value,
          description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
          details: this.state.details,
          email:JSON.parse(localStorage.userInfo).email
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
  setEditorValue(value){
    const blocksFromHTML = convertFromHTML(value);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      this.setState({editorState: EditorState.createWithContent(state)});
  }
  onToggle(node, toggled){

    this.refs.title.value = node.name;
    this.refs.description.rawContentState = node.description;

    const {cursor, data} = this.state;
    if (cursor) {
        this.setState(() => ({cursor, active: false}));
    }
    node.active = true;
    if (node.children) { 
        node.toggled = toggled; 
    }
    this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
  };
  render() {
    let treestyle = {
      tree: {
          base: {
              listStyle: 'none',
              backgroundColor: '#ffffff',
              margin: 0,
              padding: 0,
              color: 'black',
              fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
              fontSize: '14px'
          },
          node: {
              base: {
                  position: 'relative'
              },
              link: {
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0px 5px',
                  display: 'block'
              },
              activeLink: {
                  background: '#ffffff'
              },
              toggle: {
                  base: {
                      position: 'relative',
                      display: 'inline-block',
                      verticalAlign: 'top',
                      marginLeft: '-5px',
                      height: '24px',
                      width: '24px'
                  },
                  wrapper: {
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      margin: '-7px 0 0 -7px',
                      height: '14px'
                  },
                  height: 14,
                  width: 14,
                  arrow: {
                      fill: '#9DA5AB',
                      strokeWidth: 0
                  }
              },
              header: {
                  base: {
                      display: 'inline-block',
                      verticalAlign: 'top',
                      color: 'black'
                  },
                  connector: {
                      width: '2px',
                      height: '12px',
                      borderLeft: 'solid 2px black',
                      borderBottom: 'solid 2px black',
                      position: 'absolute',
                      top: '0px',
                      left: '-21px'
                  },
                  title: {
                      lineHeight: '24px',
                      verticalAlign: 'middle'
                  }
              },
              subtree: {
                  listStyle: 'none',
                  paddingLeft: '19px'
              },
              loading: {
                  color: '#E2C089'
              }
          }
      }}
    return (
      <div className="container">
       
    <div className="left-col">
    <div className="category">
    <Treebeard
                data={this.state.treeData}
                onToggle={this.onToggle}
                style={treestyle}
            />
            </div>
    </div>
    
    <div className="center-col">
    <div className="AddUser-Wrapper">
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
          placeholder ="Content"
          name ="description"
          editorState ={this.state.editorState}
          onEditorStateChange ={this.onEditorStateChange}
          ref ="description"
          required
          minLength ="3"
          maxLength ="1000000"
          id ="description"
          toolbar ={{
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
