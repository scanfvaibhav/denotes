import React, { Component, Fragment } from "react";
import {EditorState} from 'draft-js';
import {Editor} from 'primereact/editor';
import {InputTextarea} from 'primereact/inputtextarea';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import '../AddUser/AddUser.css';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import {
  load,
  onToggle,
  addNode,
  removeNode,
  edit,
  tabChange,
  onChangeHandler,
  onEditorChangeHandler,
  appendNode,
  addPosts,
  resetPost
} from './WriteController.js';
import {getPosts,getTree,getContentById,parseData} from "../../service/BaseService"; 


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
      activeIndex:0,
      open:false
    };
    this.onToggle = onToggle.bind(this);
    this.addNode = addNode.bind(this);
    this.appendNode = appendNode.bind(this);
    this.addNewNode = appendNode.bind(this);
    this.removeNode = removeNode.bind(this);
    this.edit = edit.bind(this);
    this.tabChange = tabChange.bind(this);
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
   
  }
  componentDidMount(){
    getPosts(this).then((res)=>{
      if(res && res.data.posts && res.data.posts.length){
        this.setState({posts:res.data.posts});
      }
      getTree(this).then((res)=>{
        if(res && res.data.data && res.data.data.length){
          let  data = res.data.data;
          parseData(data);
          this.setState({treeData:data});
        }
      }).catch();
    }).catch();
  }
  actionTemplate(node, column) {
    return <div key={node.key}>
        <button type="submit" name="Save" className="Add-Node-Submit fa fa-plus"></button>
        <button type="submit" onClick={removeNode.bind(this,node.key)} className="Add-Node-Submit fa fa-minus"></button>
        <button type="submit" key={node.key} onClick={edit.bind(this,node.key)} className="Add-Node-Submit fa fa-pencil-square-o"></button>
      </div>;
  }
 
  handleClickOpen () {
    this.setState({'open':true});
  };
  handleClose(){
    this.setState({'open':false});
  };
  
  render() {
    return (
      <div className="container">
        <div className="left-col-write">
        <TreeTable value={this.state.treeData}>
        <Column field="name" style={{ textAlign: 'left' ,flex:1.5}} expander></Column>
              
              <Column field="name" body={this.actionTemplate} style={{ flex:1,textAlign: 'left' }}></Column>
              
            </TreeTable>
        </div>
        <div className="center-col-write">
        <div className="card">
        
       
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
                <button type="submit" onClick={addPosts.bind(this)}className="Add-User-Submit fa fa-plus"></button>
                <button type="reset" onClick={resetPost.bind(this)}className="Add-User-Reset fa fa-eraser"></button>
             
              </div>
           
          <p>{this.state.response}</p>
        </div>
        <div>
        
        </div>
    </div>);
  }
}
export default Write;
