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
            "name": "example",
            "description" : "<p><hey text/p>",
            "children": [
                {
                    "name": "app.js"
                },
                {
                    "name": "data.js"
                },
                {
                    "name": "index.html",
                    "active": false
                },
                {
                    "name": "styles.js"
                },
                {
                    "name": "webpack.config.js"
                }
            ],
            "active": false,
            "toggled": true
        },
        {
            "name": "node_modules",
            "loading": true,
            "children": []
        },
        {
            "name": "src",
            "children": [
                {
                    "name": "components",
                    "children": [
                        {
                            "name": "decorators.js"
                        },
                        {
                            "name": "treebeard.js"
                        }
                    ]
                },
                {
                    "name": "index.js"
                }
            ]
        },
        {
            "name": "themes",
            "children": [
                {
                    "name": "animations.js"
                },
                {
                    "name": "default.js"
                }
            ]
        },
        {
            "name": "Gulpfile.js"
        },
        {
            "name": "index.js"
        },
        {
            "name": "package.json",
            "active": false
        }
    ])
    } catch(err){
      res.status(400).send({error:err});
    }
});
module.exports = router;