import React,{Component} from 'react';
import Profile from '../Profile/Profile';
import  "./Posts.css";
import {getPosts} from "../../service/BaseService"; 
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state={
        data:this.props.data,
        posts:[]
    };
}
componentDidMount(){
  getPosts(this).then((res)=>{
    if(res){
      this.setState({posts:res.data.posts});
    }
  }).catch();
}
render() {
      
        return (

          <div className="container">
       
    <div className="left-col">
    
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
  
  return(<div>
    {props.posts.map(function(data, index){
        return <Post key={index} data={data}/>
      })}
    
    </div>);
}
function Post(props){
  return (<div>
              <Topic data={props.data.topic}/>
              <Description data={props.data.description}/>
              <Details data={props.data.details}/>
              <hr/>
          </div>);
}
function Topic(props){
  return(<p className="post-topic">{props.data}</p>);
}
function Description(props){
  return(<p>{props.data}</p>);
}
function Details(props){
 
  return(<p>name:{props.data.name}</p>);
} 
export default Posts;