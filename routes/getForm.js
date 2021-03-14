const express = require('express');
const router = express.Router();

const FormMeta = require('../models/formMeta');


router.get('/getFormMeta', async(req, res) => {
    try {
        let emailId=req.query.email;
        let url=req.query.url;
        const formConfig = await FormMeta.findOne({email:emailId,url:url}).sort({time:-1});
        res.send(formConfig)
        } catch(err) {
        res.status(400).send({ error: err });
        }
    });

router.post('/addFormMeta', async(req,res)=>{
    try {
        const formMeta = await FormMeta.create(req.body.params);
        res.send(formMeta);
    } catch(err) {
        res.status(400).send({ error: err });
    }
    });


module.exports = router;