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
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { InputText } from 'primereact/inputtext';
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
  deletePosts,
  resetPost,
  addNewNode,
  loadTree,
  updateTree,
} from './WriteController.js';
import {getPosts,getTree,getContentById,parseData} from "../../service/BaseService";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

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
      treeData: [],
      nodeId: ""
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
    this.loadTree=loadTree.bind(this);
   
  }
  componentDidMount(){
    
      loadTree();
  }
 
 
  handleClickOpen () {
    this.setState({'open':true});
  };
  handleClose(){
    this.setState({'open':false});
  };
  onOpenModal = () => {
    this.setState({ open: true});
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
  
    const setSelectedNodeKeys3 =(value)=>{
      
      this.setState({selectedNodeKeys3:value});
    };
    const items = [
      {
          label: 'Delete',
          icon: 'pi pi-times',
          command: deletePosts
      },
      {
          label: 'Share',
          icon: 'pi pi-external-link',
          command:(e) => {
            //share(this);
              window.location.href = 'https://facebook.github.io/react/'
          }
      }
  ];
    const save = () => {
    //  toast.current.show({severity: 'success', summary: 'Success', detail: 'Data Saved'});
  }
  const actionTemplate = (node, column) => {
    return <div>{ node.children.length?null:<Button type="button" icon="pi pi-pencil" className="p-button-warning" onClick={edit.bind(node)}></Button>}
        </div>
        }
  const { open } = this.state;
  const header = "File Viewer";
    const footer = <div style={{ textAlign: 'left' }}><Button icon="pi pi-refresh" onClick={loadTree} tooltip="Reload" /></div>;

    return (
      <div className="container">
        <div className="left-col-write">
        <div className="card">
            <TreeTable value={this.state.treeData}
              style={{ width: '20em' }}
              selectionMode="checkbox" 
              selectionKeys={this.state.selectedNodeKeys3}
              onSelectionChange={e => setSelectedNodeKeys3(e.value)}
              dragdropScope="demo" 
              onDragDrop={event => this.setState({ treeData: event.value })} footer={footer}>
              <Column field="name" header="Name" expander></Column>
              <Column body={actionTemplate} style={{ textAlign: 'center', width: '4em' }} />
            </TreeTable>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <p>This will add new section/category to left menu</p>
          <p>
          <InputTextarea 
                  rows={5} 
                  cols={30}
                  onChange={onChangeHandler.bind(this)}
                  autoResize={true}
                  type="text"
                  placeholder="Title"
                  name="title"
                  ref="title1"
                  className="Add-User-Input"
                  minLength="3"
                  maxLength="100"
                  id="title1"
                  value={this.state.title}
                  style={{width:'90%'}} 
                  />
          <Button label="Proceed" name="addSection" onClick={updateTree.bind(this)} className="p-button-raised p-button-rounded" />
          </p>
        </Modal>
        </div>
        <div className="center-col-write">
        {Object.keys(this.state.selectedNodeKeys3).length?
        <SplitButton label="Actions" icon="pi" model={items} className="p-button-secondary p-mr-2"></SplitButton>:""}
        <Button label="Add New Section" onClick={this.onOpenModal} icon="pi pi-add" className="p-button-secondary p-mr-2" iconPos="right" />
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
                  style={{height:'195px',width:'90%'}} 
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
                <span className="p-buttonset">
                    <Button label="Save" className="p-button-success" icon="pi pi-check" type="submit" onClick={addPosts.bind(this)}/>
                    <Button label="Cancel" className="p-button-secondary" icon="pi pi-times" type="reset" onClick={resetPost.bind(this)} />
                </span>
              
             
              </div>
           
          <p>{this.state.response}</p>
        </div>
        <div>
        
        </div>
    </div>);
  }
}
export default Write;
