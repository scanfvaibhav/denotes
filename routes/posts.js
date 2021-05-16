const express = require('express');
const router = express.Router();

const Posts = require('../models/posts');
const Menu = require('../models/menu');


router.get('/default', async(req, res) => {
    try {
        let emailId=req.query.email; 
        const posts = await Posts.find({email: emailId}).sort({time:-1});
        res.send({ posts })
      } catch(err) {
        res.status(400).send({ error: err });
      }
    });

router.get('/default', async(req, res) => {
    try {
        let emailId=req.query.email; 
        const posts = await Posts.find({email: emailId}).sort({time:-1});
        res.send({ posts })
        } catch(err) {
        res.status(400).send({ error: err });
        }
    });

router.get('/top', async(req, res) => {
    try {
        var posts = await Posts.find().sort({time:-1});
        // posts=posts.slice(0,10).map(function(rec){
        //    // rec.description=rec.description.substring(0,60);
        //     return rec;});
        res.send({ posts });
        } catch(err) {
        res.status(400).send({ error: err });
        }
    });

router.get('/getContentById', async(req, res) => {
    try {
        let emailId=req.query.email;
        let titleId=req.query.titleId;
        const menu =  await Menu.find({email:emailId});
        
        let node = menu[0].menu;
        let arr=[];
        await getTreeById(node,arr,titleId);
        const posts =  await Posts.find({email: emailId,titleId:arr}).sort({time:-1});
        res.send({ posts:posts })
        } catch(err) {
            res.status(400).send({ error: err });
        }
    });

router.get('/getContentByNode', async(req, res) => {
    try {
        let emailId=req.query.email;
        let node=JSON.parse(req.query.node);
        let arr=[];
        getNode([node],arr,"");
        
        const posts = await Posts.find({email: emailId,titleId:arr}).sort({time:-1});
        res.send({ posts })
        } catch(err) {
        res.status(400).send({ error: err });
        }
    });

var  getNode =  function(node,arr,titleId){
    for(let i=0;i<node.length;i++){
        let id = node[i].key?node[i].key:node[i].id;
         arr.push(id); 
        if(node[i].children && node[i].children.length>0){
            getNode(node[i].children,arr,titleId);
        }
    }
};

var  getTreeById =  function(node,arr,titleId ){
    for(let i=0;i<node.length;i++){
        let id = node[i].key?node[i].key:node[i].id;  
        if(id==titleId){
            getNode([node[i]],arr,titleId);
        } else if(node[i].children && node[i].children.length>0){
            getTreeById(node[i].children,arr,titleId);
        }
    }
};

router.post('/create', async (req, res) => {
      try {
        let menu= await Posts.find({titleId: req.body.titleId});
        if(menu.length){
             menu = await Posts.update({
                titleId: req.body.titleId
            },{ 
              topic: req.body.title,
              description: req.body.description,
              details: req.body.details,
              time:Date.now(),
              email:req.body.email
            });
        }else{
         menu = await Posts.create({ 
          topic: req.body.title,
          description: req.body.description,
          details: req.body.details,
          time:Date.now(),
          email:req.body.email,
          titleId: req.body.titleId
        });
    }
         res.send({ menu });
      } catch(err) {
        res.status(400).send({ error: err });
      }
    
    });
const formatTree =(treeData)=>{
    for(let i in treeData){
        treeData[i]['data']={'name':treeData[i].label};
        if(treeData[i].children){
            formatTree(treeData[i].children);
        }
    }

}
router.get('/tree',async(req,res)=>{
    try{
        let emailId=req.query.email;
        let menu= await Menu.findOne({email:emailId}).sort({time:-1});
        if(menu){
            let treeData=menu.get('menu');
            formatTree(treeData)
            res.send({data:treeData?treeData:[]});
        }else{
            res.status(400).send({error:"no configured"});
        }
      } catch(err){
      res.status(400).send({error:err});
    }
});

router.post('/login',async(req,res)=>{
    try{
        res.send();
        
      } catch(err){
      res.status(400).send({error:err});
    }
});
const appendInTree = (treeData,selected_node,found,newObj)=>{
    for(let i in treeData){
        if(selected_node[treeData[i].key]){
          if(treeData[i].children)
            treeData[i].children.push(newObj);
          else
            treeData[i].children=[newObj];
          return true;
        }else if(treeData[i].children.length){
            return appendInTree(treeData[i].children,selected_node,found,newObj)
        }
      }
}

const deleteFromTree = (treeData,selected_node,found)=>{
    for(let i in treeData){
        if(selected_node[treeData[i].key]){
            delete treeData[i];
        }else if(treeData[i].children.length){
            return deleteFromTree(treeData[i].children,selected_node,found)
        }
      }
      return treeData;
}

router.post('/deleteMenu', async (req, res)=>{
    try{

        let emailId=req.body.email;
        let menu= await Menu.findOne({email:emailId}).sort({time:-1});
        if(menu){
            
            let found=false;
            let treeData=menu.get('menu');
            let selected_node=req.body.value;
            if(Array.isArray(treeData))
            found=deleteFromTree(treeData.filter((obj)=>obj.key?true:false),selected_node,found);

            if(found)
              await Menu.updateMany({email:emailId}, { $set: { menu: found } });
              res.status(200).send({successs:"ok"});
        }
    }catch(err){
        res.status(400).send({error:err});
      }
});
router.post('/updateMenuTree',async (req,res)=>{
    try{
        let emailId=req.body.email;
        let selected_node=req.body.selected_node;
        let reqObj=req.body.newObj;
        let newObj={
            "key":reqObj.key,
            "label":reqObj.label,
            "children":[]
        }
        let menu= await Menu.findOne({email:emailId}).sort({time:-1});
        if(menu){
            
            let found=false;
            let treeData=menu.get('menu');
            if(Array.isArray(treeData))
            found=appendInTree(treeData.filter((obj)=>obj.key?true:false),selected_node,found,newObj);
            else
                treeData=[];
            if(!found)
              treeData.push(newObj);
              await Menu.updateMany({email:emailId}, { $set: { menu: treeData } });
              res.status(200).send({successs:"ok"});
        }else{
            Menu.create({
                id:0,
                email:emailId,
                menu : [newObj]
            });
        }
      } catch(err){
      res.status(400).send({error:err});
    }
});

module.exports = router;