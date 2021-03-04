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
      _this.toast.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
      _this.setState({ response: `Done!` });
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
export const appendNode= async (value)=>{
    let treeData = _this.state.treeData;
    let randomId = v4();
    let selected_node = _this.state.selectedNodeKeys3;
    let newObj={ "key": randomId, "label": value, "icon": "pi pi-fw pi-file", "data": {"name":value}};
    let not_found=true;
    for(let i in treeData){
      if(selected_node[treeData[i].key]){
        if(treeData[i].children)
          treeData[i].children.push(newObj);
        else
          treeData[i].children=[newObj];
        not_found=false;
      }
    }
    if(not_found)
      treeData.push(newObj);
    
    const menu = await axios.post("/api/post/updateMenuTree", {
        menu: treeData,
        email:JSON.parse(localStorage.userInfo).email
      }
    );
    _this.setState({treeData:treeData});
    return randomId;
  };

  export async function removeNode(val){
    let treeData = _this.state.treeData;
    removeNodeFromState(treeData,val);
    await axios.post("/api/post/updateMenuTree", {
      menu: treeData,
      email:JSON.parse(localStorage.userInfo).email
    });
   // parseData(treeData);
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
