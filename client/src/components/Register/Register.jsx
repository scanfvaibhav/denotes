import React,{ Component } from "react";
import YouTube from 'react-youtube';

import Profile from '../Profile/Profile';

import Login from "../Login/Login";
import  "../Posts/Posts.css";
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            login : localStorage.getItem("userInfo")?true:false
        }
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
        const opts = {
            height: '490',
            width: '740',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
        return (
            <div className="reg-container">
            <div className="left-col"></div>
                <div className="center-col">

                <div className="tagLines">
                <h>Prepare & Share Your Notes</h>
                <br/>

                </div>
                <h className="startNow">Start Now </h>
                <Login login={this.setLogin}/>
                </div>
                <div className="right-col">
                
                </div>
            </div>
        )
    }

}
export  default Register;