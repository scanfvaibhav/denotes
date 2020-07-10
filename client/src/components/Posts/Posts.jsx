import React,{Component} from 'react';
import Profile from '../Profile/Profile';
import  "./Posts.css";
import {getPosts,getTree} from "../../service/BaseService"; 
import renderHTML from 'react-render-html';
import {Treebeard} from 'react-treebeard';


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state={
        data:this.props.data,
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
              <Description className="post-discription" data={props.data.description}/>
              <Details data={props.data}/>
              <hr/>
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