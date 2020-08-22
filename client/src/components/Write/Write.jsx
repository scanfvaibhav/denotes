import React, { Component, Fragment } from "react";
import {getPosts,getTree,getContentById,getContentByNode,parseData} from "../../service/BaseService"; 
import DnoTreeTable from "../TreeTable/DnoTreeTable";

import { EditorState, convertToRaw ,convertFromHTML,ContentState} from 'draft-js';

import {Editor} from 'primereact/editor';
import {InputTextarea} from 'primereact/inputtextarea';
import {TabView,TabPanel} from 'primereact/tabview';


import {Treebeard} from 'react-treebeard';
import {TREE_STYLE} from "../../constants/Style";

import {PanelMenu} from 'primereact/panelmenu';
import {Tree} from 'primereact/tree';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import '../AddUser/AddUser.css';
import {
  load,
  loadPosts,
  addPosts,
  onToggle,
  addNode,
  removeNode,
  edit,
  tabChange,
  onChangeHandler,
  onEditorChangeHandler,
  appendNode,
  addNewNode
} from './WriteController.js';



class Write extends Component {
  constructor(props){
    super(props);
    load(this);
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      details: {name:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).name:""},
      posts:[],
      treeData:[],
      activeIndex:0
    };
    this.onToggle = onToggle.bind(this);
    this.addNode = addNode.bind(this);
    this.appendNode = appendNode.bind(this);
    this.addNewNode = appendNode.bind(this);
    this.removeNode = removeNode.bind(this);
    this.edit = edit.bind(this);
    this.tabChange = tabChange.bind(this);

  }
  componentDidMount(){
    
    if(this.state.treeData.length==0){
      loadPosts(this);
    }
  }
  
  
  render() {
    
    return (
      <div className="container">
       
    <div className="left-col">
    <div className="category">
    {this.state.selectedNode?
      <Fragment>
        <input type="text" placeholder="add node" name="node" ref="node" minLength="3" maxLength="100" className="AddNodeText"/>
        <button type="submit" name="Save" onClick={this.addNode} className="Add-Node-Submit fa fa-plus"></button>
        <button type="submit" onClick={this.removeNode} className="Add-Node-Submit fa fa-minus"></button>
        <button type="submit" onClick={this.edit(this)} className="Add-Node-Submit fa fa-pencil-square-o"></button>
      </Fragment>:null}
     <Tree value={this.state.treeData} 
          expandedKeys={this.state.expandedKeys}
          onToggle={e => this.setState({expandedKeys: e.value})} 
          selectionMode="single" 
          selectionKeys={this.state.selectedNode} 
          onSelectionChange={e => this.setState({selectedNode: e.value})}
          style={{marginTop: '.5em',border: '0px solid #c8c8c8'}} />

    </div>
            
  </div>
    
    <div className="center-col">
    <TabView activeIndex={this.state.activeIndex} onTabChange={this.tabChange}>
    <TabPanel header="New" leftIcon="pi pi-calendar">
    
    <form className='editor' onSubmit={this.addPost}>

    <InputTextarea 
      rows={5} 
      cols={30}
      onChange={onChangeHandler.bind(this)}
      autoResize={true}
      type="text"
      placeholder="Title"
      name="title"
      ref="title"
      className="Add-User-Input"
      minLength="3"
      maxLength="100"
      id="title"
      value={this.state.title}
      style={{width:'90%'}} 
      />
      
      <Editor 
        style={{height:'95%',width:'90%'}} 
        placeholder ="Content" 
        name ="description" 
        ref ="description"
        required
        minLength ="3"
        maxLength ="1000000"
        id ="description"
        value={this.state.descriptionData}
        onTextChange={onEditorChangeHandler.bind(this)}
      />

      <button type="submit" className="Add-User-Submit fa fa-plus"></button>
      <button type="reset" className="Add-User-Reset fa fa-eraser"></button>

   </form>
    </TabPanel>
    <TabPanel header="Edit">
    <form className='editor' onSubmit={this.addPost}>

    <InputTextarea 
      rows={5} 
      cols={30}
      onChange={onChangeHandler.bind(this)}
      autoResize={true}
      type="text"
      placeholder="Title"
      name="title"
      ref="title"
      className="Add-User-Input"
      minLength="3"
      maxLength="100"
      id="title"
      value={this.state.title}
      style={{width:'90%'}} 
         />
      
      <Editor 
      style={{height:'95%',width:'90%'}} 
      placeholder ="Content"
      name ="description"
      ref ="description"
      required
      minLength ="3"
      maxLength ="1000000"
      id ="description"
      value={this.state.descriptionData}
      onTextChange={onEditorChangeHandler.bind(this)}
      />
      <button type="submit" className="Add-User-Submit fa fa-plus"></button>
      <button type="reset" className="Add-User-Reset fa fa-eraser"></button>

   </form>
    </TabPanel>
</TabView>
        

        <p>{this.state.response}</p>
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
