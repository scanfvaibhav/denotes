import React,{Component, useState} from 'react';
import Profile from '../Profile/Profile';
import  "./Posts.css";
import {getPosts,getTree,getContentById,getContentByNode} from "../../service/BaseService"; 
import renderHTML from 'react-render-html';
import {Treebeard} from 'react-treebeard';
import Fullscreen from "react-full-screen";
import {TREE_STYLE} from "../../constants/Style";
import {Card} from 'primereact/card';



class Posts extends Component {
  constructor(props) {
    super(props);
    this.state={
        data:this.props.data,
        posts:[],
        treeData:[],
        isFull: false,   
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
        this.setState({treeData:res.data.data});
      }
    }).catch();
  }).catch();
}

onToggle(node, toggled){
  const {cursor, data} = this.state;
  if (cursor) {
      this.setState(() => ({cursor, active: false}));
  }
  node.active = true;
  if (node.children) { 
      node.toggled = toggled; 
  }
  this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
  
  getContentByNode(this,node).then((res)=>{
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
          <Treebeard
            data={this.state.treeData}
            onToggle={this.onToggle}
            style={TREE_STYLE}
          />
        </div>
      </div>
    
      <div className="center-col">
        <PostList posts={this.state.posts}/>
      </div>
    
      <div className="right-col">
        <Profile data={this.state.userData}/>
      </div>
  </div>);  
  }  
} 

function PostList(props){
  return(
    <div>{
      props.posts.map(function(data, index){
        return <Card className="ui-card-shadow"><Post className = "mainPost" key={index} data={data}/></Card>
      })}
    </div>);
}

function Post(props){

  const [isFull,setIsFull]=useState(false);
  
  return (
    <div>
      <button  className="open-full-screen-button" title="Open in Full Screen" onClick={()=>setIsFull(true)}><i class="fa fa-window-maximize icon-3x"></i>
      </button>
      <Fullscreen enabled={isFull} onChange={(full) => setIsFull(full)}>
        <div className="post-main">
          <Topic data={props.data.topic}/>
          <Description  className = "post-discription" data={props.data.description}/>
          <Details data={props.data}/>
        </div>
      </Fullscreen>
    </div>);
}

function Topic(props){
  return(<p className="post-topic">{props.data}</p>);
}

function Description(props){
  return renderHTML(props.data);
}

function Details(props){
  return(<p className="post-details"><i>Last Updated:</i>{props.data.time}<i> By:</i>{props.data.details.name}</p>);
} 

export default Posts;