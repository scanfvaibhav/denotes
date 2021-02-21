import React,{ Component,Fragment, useState, useEffect, useRef } from 'react';
import {EditorState} from 'draft-js';
import {Editor} from 'primereact/editor';
import {InputTextarea} from 'primereact/inputtextarea';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import '../AddUser/AddUser.css';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Tree } from 'primereact/tree';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
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
  resetPost,
  addNewNode
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
      activeIndex:0,
      open:false,
      selectedNodeKeys3:[],
      treeData: []
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
    
      getTree(this).then((res)=>{
        if(res && res.data.data && res.data.data.length){
          let  data = res.data.data;
          //parseData(data);
          this.setState({treeData:data});
        }
      }).catch();
  }
 
 
  handleClickOpen () {
    this.setState({'open':true});
  };
  handleClose(){
    this.setState({'open':false});
  };
  
  render() {
  
    const setSelectedNodeKeys3 =(value)=>{
      
      this.setState({selectedNodeKeys3:value});
    };
    const items = [
      {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: (e) => {
             // toast.current.show({severity:'success', summary:'Updated', detail:'Data Updated'});
          }
      },
      {
          label: 'Delete',
          icon: 'pi pi-times',
          command: (e) => {
             // toast.current.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          label: 'React Website',
          icon: 'pi pi-external-link',
          command:(e) => {
              window.location.href = 'https://facebook.github.io/react/'
          }
      },
      {   label: 'Upload',
          icon: 'pi pi-upload',
          command:(e) => {
              window.location.hash = "/fileupload"
          }
      }
  ];
    const save = () => {
    //  toast.current.show({severity: 'success', summary: 'Success', detail: 'Data Saved'});
  }
    return (
      <div className="container">
        <div className="left-col-write">
        <div className="card">
            <Tree value={this.state.treeData} selectionMode="checkbox" selectionKeys={this.state.selectedNodeKeys3} onSelectionChange={e => setSelectedNodeKeys3(e.value)} dragdropScope="demo" onDragDrop={event => this.setState({ treeData: event.value })} />
        </div>
        </div>
        <div className="center-col-write">
        {Object.keys(this.state.selectedNodeKeys3).length?
        <SplitButton label="Actions" icon="pi" model={items} className="p-button-secondary p-mr-2"></SplitButton>:""}
        <Button label="Add New Section" icon="pi pi-add" className="p-button-secondary p-mr-2" iconPos="right" />
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
