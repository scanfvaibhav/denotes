import React,{Component, useState, Fragment} from 'react';
import Profile from '../Profile/Profile';

import {getPosts,getTree,getContentById,getContentByNode,parseData} from "../../service/BaseService"; 
import renderHTML from 'react-render-html';
import {Card} from 'primereact/card';
import {Tree} from 'primereact/tree';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import  "./Posts.css";
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../reducers'


const store = createStore(rootReducer);

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state={
        data:this.props.data,
        posts:[],
        treeData:[],
        isFull: false,   
    };
    //this.onSelectionChange = this.onSelectionChange.bind(this);
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


onSelectionChange=(node)=>{
  this.setState({selectedNode: node.value});
  getContentById(this,node.value).then((res)=>{
    if(res){
      this.setState({posts:res.data.posts});
    }
  }).catch();
};

render() {
  return (
    <div className="container">

      <div className="left-col">
        <div className="category">
        <Tree value={this.state.treeData}
        expandedKeys={this.state.expandedKeys}
                        onToggle={e => this.setState({expandedKeys: e.value})} 
                        selectionMode="single" 
                        selectionKeys={this.state.selectedNode} 
                        onSelectionChange={this.onSelectionChange}
                        style={{marginTop: '.5em',border: '0px solid #c8c8c8'}} />
          
        </div>
      </div>
    
      <div className="center-col">
        <PostList posts={this.state.posts}/>
      </div>
    
      <div className="right-col">
        <Provider store={store}>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </Provider>
      </div>
  </div>);  
  }  
} 

function PostList(props){
  return(
    <div>{
      props.posts.map(function(data, index){
        return <Post className = "mainPost" key={index} data={data}/>
      })}
    </div>);
}

function Post(props){

  const [isFull,setIsFull]=useState(false);
  
  if(props && props.data){
    return (
      <Fragment>
        <Card title={props.data?props.data.topic:""}>
          {renderHTML(props.data?props.data.description:"<p></p>")}
        </Card>
        <Details data={props.data}/>
      </Fragment>
      );

  }else{
    return null;
  }
}

function Details(props){
  return(<p className="post-details"><i>Last Updated:</i>{props.data.time}<i> By:</i>{props.data.details.name}</p>);
} 

export default Posts;