import axios from 'axios';
import {GLOBAL_SEARCH,GET_USER} from '../constants/BaseConstants';
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