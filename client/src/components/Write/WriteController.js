import {getPosts,getTree,getContentById,getContentByNode,parseData} from "../../service/BaseService"; 
import axios from "axios";
import {v4} from "uuid";

var _this=null;
export function load(obj){
    _this=obj;
}
export function loadPosts(){
    getPosts(_this).then((res)=>{
        if(res){
          _this.setState({posts:res.data.posts});
        }
        getTree(_this).then((res)=>{
          if(res){
            let data=res.data.data;
            parseData(data);
            _this.setState({treeData:data});
          }
        }).catch();
      }).catch();
}

export function addPosts(e){
    e.preventDefault();
    try {
      let title = _this.state.title;
     
      if(_this.state.activeIndex==0){
        let randomId = this.appendNode(title);
      const newPost = axios.post("/api/post/create", {
          title: title,
          description: _this.state.description,
          details: _this.state.details,
          email:JSON.parse(localStorage.userInfo).email,
          titleId : randomId
        }
      );
      }else{
        const newPost =  axios.post("/api/post/create", {
          title: title,
          description: _this.state.description,
          details: _this.state.details,
          email:JSON.parse(localStorage.userInfo).email,
          titleId : _this.state.selectedNode
        }
      );
      }
      
      _this.setState({ response: `Done!` });
    } catch (err) {
      _this.setState({ response: err.message });
    }
}
export const appendNode= async (value)=>{
    let treeData = _this.state.treeData;
    let randomId = v4();
    if(_this.state.selectedNode){
      _this.addNewNode(treeData,_this.state.selectedNode,value,randomId);
    }else{
      treeData.push({name:value,id:randomId});
    }
    const menu = await axios.post("/api/post/updateMenuTree", {
        menu: treeData,
        email:JSON.parse(localStorage.userInfo).email
      }
    );
    let data=menu.data.menu;
    parseData(data);
    _this.setState({treeData:data});
    return randomId;
  };

  export async function removeNode(){
    let val = _this.state.selectedNode;
    let treeData = _this.state.treeData;
    removeNodeFromState(treeData,val);
    const menu = await axios.post("/api/post/updateMenuTree", {
      menu: treeData,
      email:JSON.parse(localStorage.userInfo).email
    });
    parseData(treeData);
    _this.setState({treeData:treeData});

  };

export function onChangeHandler(e){
    _this.setState({ [e.target.name]: e.target.value });
}
export function onEditorChangeHandler(e){
    _this.setState({"description":  e.htmlValue });
}



 const addNewNode=(treeData,id,name,randomId)=>{
  for(let i in treeData){
    if(treeData[i].id===id){
      if(!treeData[i]["children"]){
        treeData[i]["children"]=[];
      }
      treeData[i]["children"].push({name:name,id:randomId});
      treeData[i]["toggled"]=true;
    }else{
      if(treeData[i]["children"]){
        _this.addNewNode(treeData[i]["children"],id,name,randomId);
      }
    }
  }
};

export async function  addNode(){
  debugger
  let val = _this.refs.node.value;
  await _this.appendNode(val);
};



async function removeNodeFromState(treeData,id){
  for(let i=0;i<treeData.length;i++){
    if(treeData[i].id===id){
      treeData.splice(i,1);
    }else if(treeData[i].children)
      _this.removeNodeFromState(treeData[i].children,id)
  }
};

export function edit(_this){
  let selectedNode = _this.state.selectedNode;
  getContentById(_this,selectedNode).then((res)=>{
    if(res && res.data && res.data.posts[0]){
      _this.setState({
        descriptionData:res.data.posts[0].description,
        title : res.data.posts[0].topic,
        id : res.data.posts[0].titleId,
        activeIndex:1
      });
    }
  }).catch();
  //_this.refs.description.value="hello"
};


function onEditorStateChange(editorState){
  _this.setState({
    editorState,
  });
}

export function onToggle(node, toggled){
  debugger
  _this.setState({expandedKeys: node.value});
  _this.setState({selectedNode:node});
  _this.refs.title.value = node.name;
  _this.refs.description.rawContentState = node.description;

  const {cursor, data} = _this.state;
  if (cursor) {
      _this.setState(() => ({cursor, active: false}));
  }
  node.active = true;
  if (node.children) { 
      node.toggled = toggled; 
  }
  _this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
};

export function tabChange(e){
  if(e.index==0){
    //_this.refs.description.props.value="test"
  }
    _this.setState({activeIndex: e.index})
}
