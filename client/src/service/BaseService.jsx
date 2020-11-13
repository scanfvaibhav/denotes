import axios from 'axios';
import {
    GLOBAL_SEARCH,
    GET_USER,GET_DEFAULT_POSTS,
    GET_MSG,GET_TREE,
    GET_CONTENT_BY_TITLE_ID,
    GET_CONTENT_BY_NODE,
    GET_TOP_POSTS
} from '../constants/BaseConstants';
export function getSearchinfo(query,_this){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GLOBAL_SEARCH,{
        cancelToken: _this.cancel.token,
        params:{'search':query}
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
     

}
export function  getUser(_this,token){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GET_USER,{
        cancelToken: _this.cancel.token,
        params:{'token':token}
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
}
export function getTopPosts(_this){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GET_TOP_POSTS,{
        cancelToken: _this.cancel.token
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
}
export function getPosts(_this){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GET_DEFAULT_POSTS,{
        cancelToken: _this.cancel.token,
        params:{'email':JSON.parse(localStorage.userInfo).email}
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
}
export function parseData(data){
    for(let i=0;i<data.length;i++){
      Object.assign(data[i],{
        "key": data[i].id,
        "label": data[i].name,
        "data": {
            "name":data[i].name
        },
        "icon": "pi pi-fw pi-inbox",
        "draggable":true,
        "droppable":true
      });
      if(data[i].children)
        parseData(data[i].children);
    }
  }
export function getContentById(_this,id){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GET_CONTENT_BY_TITLE_ID,{
        cancelToken: _this.cancel.token,
        params:{'email':JSON.parse(localStorage.userInfo).email,titleId:id}
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
}

export function getContentByNode(_this,node){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GET_CONTENT_BY_NODE,{
        cancelToken: _this.cancel.token,
        params:{'email':JSON.parse(localStorage.userInfo).email,node:node}
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
}

export function getTree(_this){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GET_TREE,{
        cancelToken: _this.cancel.token,
        params:{
            'email':JSON.parse(localStorage.userInfo).email,
            'type':'READ'
        }
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
}
export function getMessages(_this,email){
    if (_this.cancel) {
		_this.cancel.cancel();
	}
  _this.cancel = axios.CancelToken.source();
    return new Promise((resolve,reject)=>axios.get(GET_MSG,{
        cancelToken: _this.cancel.token,
        params:{'email':email}
    })
    .then((res) => {
        resolve(res);
    })
    .catch((error) => {
        reject(error);
        
    })); 
}