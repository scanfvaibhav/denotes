const express = require('express');
const router = express.Router();

const Chats = require('../models/chat');

router.get('/all', async(req, res) => {
    try {
        let email=req.params.email; 
        const chats = await Chats.find({$or:[{from: email},{to:email}]});
        res.send({ chats })
      } catch(err) {
        res.status(400).send({ error: err });
      }
    });
module.exports = router;