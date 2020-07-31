import React, { Component, Fragment } from "react";
import {getPosts,getTree,getContentById,getContentByNode,parseData} from "../../service/BaseService"; 

import axios from "axios";
import { EditorState, convertToRaw ,convertFromHTML,ContentState} from 'draft-js';

import {Editor} from 'primereact/editor';
import {InputTextarea} from 'primereact/inputtextarea';
import {TabView,TabPanel} from 'primereact/tabview';

import {Treebeard} from 'react-treebeard';
import {TREE_STYLE} from "../../constants/Style";
import {v4} from "uuid";
import {PanelMenu} from 'primereact/panelmenu';
import {Tree} from 'primereact/tree';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import '../AddUser/AddUser.css';


class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      details: {name:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).name:""},
      posts:[],
      treeData:[],
      activeIndex:0
    };
    this.onToggle = this.onToggle.bind(this);
    this.addNode = this.addNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.edit = this.edit.bind(this);
    this.tabChange = this.tabChange.bind(this);

    this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  componentDidMount(){
    if(this.state.treeData.length==0){
      getPosts(this).then((res)=>{
        if(res){
          this.setState({posts:res.data.posts});
        }
        getTree(this).then((res)=>{
          if(res){
            let data=res.data.data;
            parseData(data);
            this.setState({treeData:data});
          }
        }).catch();
      }).catch();
    }
  }
  
  onChangeHandler = e => {
      this.setState({ [e.target.name]: e.target.value });
  }
  onEditorChangeHandler = e => {
      this.setState({"description":  e.htmlValue });
  }

  addPost = async e => {
    e.preventDefault();
    try {
      let title = this.state.title;
     
      if(this.state.activeIndex==0){
        let randomId = await this.appendNode(title);
      const newPost = await axios.post("/api/post/create", {
          title: title,
          description: this.state.description,
          details: this.state.details,
          email:JSON.parse(localStorage.userInfo).email,
          titleId : randomId
        }
      );
      }else{
        const newPost = await axios.post("/api/post/create", {
          title: title,
          description: this.state.description,
          details: this.state.details,
          email:JSON.parse(localStorage.userInfo).email,
          titleId : this.state.selectedNode
        }
      );
      }
      
      this.setState({ response: `Done!` });
    } catch (err) {
      this.setState({ response: err.message });
    }
  };

  addNewNode(treeData,id,name,randomId){
    for(let i in treeData){
      if(treeData[i].id===id){
        if(!treeData[i]["children"]){
          treeData[i]["children"]=[];
        }
        treeData[i]["children"].push({name:name,id:randomId});
        treeData[i]["toggled"]=true;
      }else{
        if(treeData[i]["children"]){
          this.addNewNode(treeData[i]["children"],id,name,randomId);
        }
      }
    }
  };

  async addNode(){
    let val = this.refs.node.value;
    await this.appendNode(val);
  };

  async removeNode(){
    let val = this.state.selectedNode;
    let treeData = this.state.treeData;
    this.removeNodeFromState(treeData,val);
    const menu = await axios.post("/api/post/updateMenuTree", {
      menu: treeData,
      email:JSON.parse(localStorage.userInfo).email
    });
    parseData(treeData);
    this.setState({treeData:treeData});

  };

  async removeNodeFromState(treeData,id){
    for(let i=0;i<treeData.length;i++){
      if(treeData[i].id===id){
        treeData.splice(i,1);
      }else if(treeData[i].children)
        this.removeNodeFromState(treeData[i].children,id)
    }
  };

  edit(){
    let selectedNode = this.state.selectedNode;
    getContentById(this,selectedNode).then((res)=>{
      if(res && res.data && res.data.posts[0]){
        this.setState({
          descriptionData:res.data.posts[0].description,
          title : res.data.posts[0].topic,
          id : res.data.posts[0].titleId,
          activeIndex:1
        });
      }
    }).catch();
    //this.refs.description.value="hello"
  };

  async appendNode(value){
    let treeData = this.state.treeData;
    let randomId = v4();
    if(this.state.selectedNode){
      this.addNewNode(treeData,this.state.selectedNode,value,randomId);
    }else{
      treeData.push({name:value,id:randomId});
    }
    const menu = await axios.post("/api/post/updateMenuTree", {
        menu: treeData,
        email:JSON.parse(localStorage.userInfo).email
      }
    );
    let data=menu.data.menu;
    parseData(data);
    this.setState({treeData:data});
    return randomId;
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
    this.setState({expandedKeys: node.value});
    this.setState({selectedNode:node});
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
  onSelectionChange(e){
    debugger
  };
  tabChange(e){
    if(e.index==0){
      //this.refs.description.props.value="test"
    }
      this.setState({activeIndex: e.index})
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
        <button type="submit" onClick={this.edit} className="Add-Node-Submit fa fa-pencil-square-o"></button>
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
      onChange={this.onChangeHandler.bind(this)}
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
        onTextChange={this.onEditorChangeHandler.bind(this)}
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
      onChange={this.onChangeHandler.bind(this)}
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
      onTextChange={this.onEditorChangeHandler.bind(this)}
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
