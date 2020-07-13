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

router.get('/getContentById', async(req, res) => {
    try {
        let emailId=req.query.email;
        let titleId=req.query.titleId;
        const posts = await Posts.find({titleId:titleId}).sort({time:-1});
        res.send({ posts })
        } catch(err) {
        res.status(400).send({ error: err });
        }
    });

router.post('/create', async (req, res) => {
      try {
        const newUser = await Posts.create({ 
          topic: req.body.title,
          description: req.body.description,
          details: req.body.details,
          time:Date.now(),
          email:req.body.email,
          titleId: req.body.titleId
        });
         res.send({ newUser });
      } catch(err) {
        res.status(400).send({ error: err });
      }
    
    });

router.get('/tree',async(req,res)=>{
    try{
        let emailId=req.query.email;
        let menu= await Menu.find({email: emailId});
        res.send({data:menu.length?menu[0].menu:[]});
      } catch(err){
      res.status(400).send({error:err});
    }
});

router.post('/updateMenuTree',async(req,res)=>{
    try{
        debugger
        let emailId=req.body.email;
        let menu= await Menu.find({'email':emailId});
        if(menu.length){
            menu = await Menu.findOneAndUpdate({
                email:emailId,
                menu : req.body.menu
            });
        }else{
            menu = await Menu.create({
                id:0,
                email:emailId,
                menu : req.body.menu
            });
        }
        res.send(menu);
      } catch(err){
      res.status(400).send({error:err});
    }
});

module.exports = router;