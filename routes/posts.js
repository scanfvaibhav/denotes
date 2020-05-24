const express = require('express');
const router = express.Router();

const Posts = require('../models/posts');

router.get('/default', async(req, res) => {
    try {
        const posts = await Posts.find({});
        res.send({ posts })
      } catch(err) {
        res.status(400).send({ error: err });
      }
    });
router.post('/create', async (req, res) => {
      try {
        const newUser = await Posts.create({ topic: req.body.title, description: req.body.description, details: req.body.details });
         res.send({ newUser });
      } catch(err) {
        res.status(400).send({ error: err });
      }
    
    });
module.exports = router;