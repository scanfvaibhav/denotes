import React,{ Component } from "react";
import YouTube from 'react-youtube';

import Profile from '../Profile/Profile';
import {getTopPosts,getTree,getContentById,parseData} from "../../service/BaseService"; 
import Login from "../Login/Login";
import  "./Register.css";
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
                let divs="";
            for(let i=0;i<10;i++){
               divs=divs+"<div class='statement-card'><div class='monthly-balance'>"+res.data.posts[i].title+"</div></div>"
            }
              this.setState({topPosts:divs});
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
        
        return (
            <div className="reg-container-main">
                <h1>Write & Share</h1>
                <Login login={this.setLogin}/>
                <div id="monthly-statements">{this.state.topPosts}</div>
            </div>
        )
    }

}
export  default Register;