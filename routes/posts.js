const express = require('express');
const router = express.Router();

const Posts = require('../models/posts');


router.get('/default', async(req, res) => {
    try {
        let emailId=req.query.email; 
        const posts = await Posts.find({email: emailId}).sort({time:-1});
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
          email:req.body.email
        });
         res.send({ newUser });
      } catch(err) {
        res.status(400).send({ error: err });
      }
    
    });

router.get('/tree',async(req,res)=>{
    try{
      res.send([
        {
            "name": "JavaScript",
            "id":"ajsb",
            "description" : "<p><hey text/p>",
            "children": [
                {
                    "name": "Closures",
                    "id":"cls"
                },
                {
                    "name": "Arrow Function",
                    "id":"arr"
                },
                {
                    "name": "Data types",
                    "active": false
                },
                {
                    "name": "Asynchronous JS"
                },
                {
                    "name": "Call()"
                }
            ],
            "active": false,
            "toggled": true
        },
        {
            "name": "React",
            "children": [{
                "name":"State/Props",

            },{
                "name":"Hooks",

            }]
        },
        {
            "name": "Data Structures",
            "children": [
                {
                    "name": "Linked List",
                    "children": [
                        {
                            "name": "Singly"
                        },
                        {
                            "name": "Doubly"
                        },{
                            "name": "Circular"
                        }
                    ]
                },
                {
                    "name": "Tree"
                }
            ]
        },
        {
            "name": "Algorithm",
            "children": [
                {
                    "name": "Big O Notation"
                },
                {
                    "name": "Complexity"
                }
            ]
        },
        {
            "name": "Genetic Engineering"
        },
        {
            "name": "Behavioural Studies"
        },
        {
            "name": "Health",
            "active": false
        }
    ])
    } catch(err){
      res.status(400).send({error:err});
    }
});
module.exports = router;