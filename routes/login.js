const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const {generateWebAppURL,cricketerSearch,facebookUser} = require('../utils/BaseUtil');

const User = require('../models/users');

router.get('/user-details', (req, res) => {
  console.log(req.query.token);
  let value=req.query.token;
  let type = "facebook";
  const apiUrl = facebookUser(value,type);
  console.log(apiUrl);
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.redirect('/error');
    });

});
router.post('/register',async(req,res)=>{
  try{
    let email = req.body.email;
    let password  = req.body.password;
    const user = await User.create({
      email: email,
      password:password,
      name:req.body.name,
      gender: "Male",
      age:"20"
    });
    res.send(user);
  }catch(err) {
    res.status(400).send({ error: err });
  }
});
router.post('/login',async(req,res)=>{
  try{
    let email = req.body.email;
    let password  = req.body.password;
    const user =  await User.find({$and:[{email: email},{password:password}]});
    res.send(user[0]);
  }catch(err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;