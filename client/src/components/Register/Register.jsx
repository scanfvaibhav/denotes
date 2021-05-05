import React,{ Component } from "react";
import YouTube from 'react-youtube';

import Profile from '../Profile/Profile';
import {Card} from 'primereact/card';
import {getTopPosts,getTree,getContentById,parseData} from "../../service/BaseService"; 

import Login from "../Login/Login";
import  "./Register.css";
import renderHTML from 'react-render-html';
import { Button } from 'primereact/button';
import { func } from "prop-types";
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            login : localStorage.getItem("userInfo")?true:false
        }
    }
    componentDidMount(){
        getTopPosts(this).then((res)=>{
            if(res && res.data.posts && res.data.posts.length){
                let posts=res.data.posts;
                this.setState({topPosts:posts});
            }
          }).catch();
    }
    setLogin=(value)=>{
        this.setState({
            login:value
        })
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
      
    render(){
        
         return (<div className="reg-container-main">
                <Login login={this.setLogin}/>
                {this.state.topPosts?
            <div className="monthly-statements">{this.state.topPosts.map((obj,index)=>{
               
            return <Card  className = "statement-card" title={obj.topic} >
                <p className="statement-content">{renderHTML(obj.description?obj.description:"<p>_</p>")}</p>
                </Card>
            })}</div>:""}
            </div>)
        }
}
export  default Register;