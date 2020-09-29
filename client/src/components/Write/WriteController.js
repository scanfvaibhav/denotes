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
export const addPosts=(e)=>{
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
        _this.appendNode(title).then((res)=>{
          axios.post("/api/post/create", {
            title: title,
            description: _this.state.description,
            details: _this.state.details,
            email:JSON.parse(localStorage.userInfo).email,
            titleId : res
          }
        );
        });
      
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

  export async function removeNode(val){
    let treeData = _this.state.treeData;
    removeNodeFromState(treeData,val);
    await axios.post("/api/post/updateMenuTree", {
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


export async function  addNode(){
  debugger
  let val = _this.refs.node.value;
  await _this.appendNode(val);
};



function removeNodeFromState(treeData,id){
  for(let i=0;i<treeData.length;i++){
    if(treeData[i].id===id){
      treeData.splice(i,1);
    }else if(treeData[i].children)
      removeNodeFromState(treeData[i].children,id)
  }
};

export function edit(value,a,b,c){
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
