const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const {generateWebAppURL,cricketerSearch,facebookUser} = require('../utils/BaseUtil');

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

module.exports = router;