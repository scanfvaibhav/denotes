import React,{ Component } from "react";
import YouTube from 'react-youtube';

import Profile from '../Profile/Profile';

import Login from "../Login/Login";
import  "./Register.css";
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
        
        return (
            <div className="reg-container-main">
                <h1>Prepare Your Notes</h1>
                <h1>&</h1>
                <h1>Share Your Notes</h1>
                <Login login={this.setLogin}/>
 
            </div>
        )
    }

}
export  default Register;