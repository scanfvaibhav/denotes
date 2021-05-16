import {getPosts,getTree,getContentById,parseData} from "../../service/BaseService"; 
import axios from "axios";
import {v4} from "uuid";

var _this=null;
export function load(obj){
  
    _this=obj;
}
export const resetPost=(e)=>{
  _this.setState({
    descriptionData:"",
    title : "",
    id : "",
    selectedNode:""
  });
}

export const deletePosts=()=>{
  
  if(_this.state.selectedNodeKeys3)
    _this.removeNode(_this.state.selectedNodeKeys3);
}
export const updateTree = async ()=>{
  let randomId = v4();
  let title = _this.state.title;
  await axios.post("/api/post/updateMenuTree", {
    newObj:{ "key": randomId, "label": title},
    selected_node:_this.state.selectedNodeKeys3,
    email:JSON.parse(localStorage.userInfo).email
  });
  loadTree();
  _this.setState({ open: false });
}
export const addPosts = async (e)=>{
   // e.preventDefault();
   
    try {
      let title = _this.state.title;
     
      if(_this.state.selectedNode){
        axios.post("/api/post/create", {
          title: title,
          description: _this.state.description,
          details: _this.state.details,
          email:JSON.parse(localStorage.userInfo).email,
          titleId : _this.state.selectedNode
        }
      );
        
      }else{
        let randomId = v4();
   await axios.post("/api/post/updateMenuTree", {
        newObj:{ "key": randomId, "label": title},
        selected_node:_this.state.selectedNodeKeys3,
        email:JSON.parse(localStorage.userInfo).email
      }
    );
    await axios.post("/api/post/create", {
      title: title,
      description: _this.state.description,
      details: _this.state.details,
      email:JSON.parse(localStorage.userInfo).email,
      titleId : randomId
    });
    loadTree();
      
      }
    } catch (err) {
      _this.setState({ response: err.message });
    }
}
export const loadTree = ()=>{
  getTree(_this).then((res)=>{
    if(res && res.data.data && res.data.data.length){
      let  data = res.data.data;
      //parseData(data);
      _this.setState({treeData:data});
    }
  }).catch();
}
export const addNewNode=async (value)=>{
  _this.setState({
    "selectedNode":value,
  "descriptionData":"",
  "title" :"New Topic"});
  _this.appendNode("New Topic").then((res)=>{
    _this.setState({"selectedNode":res});
  });
}
export const appendNode=  (value)=>{
    let randomId = v4();
    const menu =  axios.post("/api/post/updateMenuTree", {
        newObj:{ "key": randomId, "label": value, "icon": "pi pi-fw pi-file", "data": {"name":value}},
        selected_node:_this.state.selectedNodeKeys3,
        email:JSON.parse(localStorage.userInfo).email
      }
    );
    menu.then((res)=>{
      loadTree();
    })
    
    return randomId;
  };

  export function removeNode(val){
    axios.post("/api/post/deleteMenu", {
      value: val,
      email:JSON.parse(localStorage.userInfo).email
    }).then((res)=>{
      loadTree();
    });
  };

export function onChangeHandler(e){
    _this.setState({ [e.target.name]: e.target.value });
}
export function onEditorChangeHandler(e){
    _this.setState({"description":  e.htmlValue });
}


export async function  addNode(){
  debugger
  let val = _this.refs.node.value;
  await _this.appendNode(val);
};



function removeNodeFromState(treeData,obj){
 if(typeof obj==="object"){
   for(let i in obj){
     if(obj[i].checked==true && obj[i].partialChecked==false){
      removeNodebyId(treeData,i);
     }
   }
 }
};

function removeNodebyId(treeData,id){
  for(let i=0;i<treeData.length;i++){
    if(treeData[i].key===id){
      treeData.splice(i,1);
    }else if(treeData[i].children)
    removeNodebyId(treeData[i].children,id)
  }
}

export function edit(value,a,b,c){
  value=this.key;
  getContentById(_this,value).then((res)=>{
    if(res && res.data && res.data.posts[0]){
      _this.setState({
        descriptionData:res.data.posts[0].description,
        title : res.data.posts[0].topic,
        id : res.data.posts[0].titleId,
        selectedNode:value
      });
    }
  }).catch();
  //_this.refs.description.value="hello"
};




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
  if(e.index===0){
    //_this.refs.description.props.value="test"
  }
    _this.setState({activeIndex: e.index})
}
