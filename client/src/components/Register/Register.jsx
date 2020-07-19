import React,{ Component } from "react";

import Profile from '../Profile/Profile';

import Login from "../Login/Login";

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
    render(){
        return (
            <div className="container">
                <div className="left-col">
                </div>
                <div className="right-col">
                <Login login={this.setLogin}/>
                </div>
            </div>
        )
    }

}
export  default Register;