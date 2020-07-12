import React, { Component } from "react";
import {getPosts,getTree} from "../../service/BaseService"; 
import '../AddUser/AddUser.css';
import axios from "axios";
import { EditorState, convertToRaw ,convertFromHTML,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Treebeard} from 'react-treebeard';
import {TREE_STYLE} from "../../constants/Style";


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
    this.addNode = this.addNode.bind(this);
  }
  componentDidMount(){
    if(this.state.treeData.length==0){
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
  addNewNode(treeData,id,name){
    for(let i in treeData){
      if(treeData[i].id===id){
        if(!treeData[i]["children"]){
          treeData[i]["children"]=[];
        }
        treeData[i]["children"].push({name:name});
        treeData[i]["toggled"]=true;
      }else{
        if(treeData[i]["children"]){
          this.addNewNode(treeData[i]["children"],id,name);
        }
      }
    }
  };
  addNode(){
    let val = this.refs.node.value;
    let treeData = this.state.treeData;
    if(this.state.selectedNode){
      this.addNewNode(treeData,this.state.selectedNode,val);
    }else{
      treeData.push({name:val});
    }
    this.setState({treeData:treeData});
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
debugger
    this.setState({selectedNode:node.id});
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
    
    return (
      <div className="container">
       
    <div className="left-col">
    <div className="category">
    
    <Treebeard
                data={this.state.treeData}
                onToggle={this.onToggle}
                style={TREE_STYLE}
                ref="treeMenu"
            />
            
            <input 
            type="text"
            placeholder="add node"
            name="node"
            ref="node"
            minLength="3"
            maxLength="100"
          /><button type="submit" onClick={this.addNode} className="fa fa-plus"></button>
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
