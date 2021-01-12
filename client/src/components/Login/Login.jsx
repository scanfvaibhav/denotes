import React from "react";
import ReactModalLogin from "react-modal-login";
import axios from "axios";
import "./Login.css";
 
import { facebookConfig, googleConfig } from "../../config/social-config";
import  {getUser}  from '../../service/BaseService';
 
export default class Login extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      graphPopupdisplay : false,
      graphPopupmsg : "Dataview",
      graphData : {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [{ source: "Harry", target: "Sally" }, { source: "Harry", target: "Alice" }],
        },
      showPopup: false ,
      showModal: false,
      loading: false,
      error: null,
      user:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
    };
  }
 
  openModal() {
      
    this.setState({
      showModal: true
    });
    
  }
  togglePopup() {  
    this.setState({
      showPopup:!this.state.showPopup
    });     
  } 
  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }
  logout(){
    delete localStorage.userInfo;
    delete localStorage.authInfo;
    this.setState({
      user: "",
      picture: ""
    });
    if(this.props.login){
      this.props.login(false);
      
    }
    this.refreshPage();
  }
  onLoginSuccess(method, response) {
      this.closeModal();
      let token=response.authResponse.accessToken;
      localStorage.setItem("authInfo",JSON.stringify(response));
      getUser(this,token).then((res) => {
        if(res){
          localStorage.setItem("userInfo",JSON.stringify(res.data));
        if(this.props.login){
          this.props.login(true);
          this.refreshPage();
        }
        this.setState({
          user: res.data,
          picture: res.data.picture,
        });
      }
      }).catch(() => {
        //reject('ERROR GETTING DATA FROM FACEBOOK')
      });
  }
  
 
  onLoginFail(method, response) {
    console.log("logging failed with " + method);
    this.setState({
      error: response
    });
  }
 
  startLoading() {
    this.setState({
      loading: true
    });
  }
 
  finishLoading() {
    this.setState({
      loading: false
    });
  }
  refreshPage() {
    window.location.reload(false);
  }
  afterTabsChange() {
    this.setState({
      error: null
    });
  }
  toggleGraphPopup=()=> {  
    this.setState({
      graphPopupdisplay:!this.state.graphPopupdisplay,
      graphPopupmsg:"Friends"
    });
  } 
  login = async (val) => {
    try {
      const newUser = await axios.post("/api/login/login", {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        }
      );
      localStorage.setItem("authInfo",JSON.stringify(newUser.data));
      localStorage.setItem("userInfo",JSON.stringify(newUser.data));
      
      if(this.props.login){
        this.props.login(true);
        this.refreshPage();
        
      }
    } catch (err) {
      this.setState({ response: err.message });
    }
  };
  register = async (val) => {
    try {
      const newUser = await axios.post("/api/login/register", {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        }
      );
      localStorage.setItem("authInfo",JSON.stringify(newUser.data));
      localStorage.setItem("userInfo",JSON.stringify(newUser.data));
      
      if(this.props.login){
        this.props.login(true);
        this.refreshPage();
      }
    } catch (err) {
      this.setState({ response: err.message });
    }
  };
  startLoading() {
    this.setState({
      loading: true
    })
  }

  finishLoading() {
    this.setState({
      loading: false
    })
  }

  onTabsChange() {
    this.setState({
      error: null
    });
  }
  render() {
    return (
      <div>
      <p>{this.state.user.name}</p>
        <p>
          {this.state.user.name?<button onClick={() => this.logout()}>Logout</button>:
    
          <button onClick={() => this.openModal()} className="glossy-button glossy-button--red">SignIn/SignUp</button>
          
        }
        </p>
        <ReactModalLogin
          mainWrapClass = 'reactModel'
          overlayClass = 'reactModel'
          containerClass = 'reactModel'
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          ref = 'login'
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          registerError={{
            label: "Couldn't sign up, please try again."
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form={{
            
            'registerInputs':[{
              type:'text',
              id:'name',
              name:'name',
              placeholder:'Name'
            },{
              type:'email',
              id:'email',
              name:'email',
              placeholder:'email',
            },{
              type:'password',
              id:'password',
              name:'password',
              placeholder:'password'
            }],
            'registerBtn':{
              label:"SignUp"
            },
            'loginInputs':[{
              type:'email',
              id:'email',
              ref:'email',
              name:'email',
              placeholder:'email'
            },{
              type:'password',
              id:'password',
              ref:'password',
              name:'password',
              placeholder:'password'
            }],
            loginBtn:{
              label:'SignIn'
            },
            onLogin :this.login,
            onRegister:this.register
          }}
          providers={{
            facebook: {
              config: facebookConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Facebook"
            },
            /*google: {
              config: googleConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Google"
            }*/
          }}
        />
      </div>
    );
  }
}