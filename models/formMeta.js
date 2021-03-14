const mongoose = require('mongoose');

const formMeta = new mongoose.Schema({
    id : {
        type:String,
        required: false
    },
    email : {
        type:String,
        required: false
    },
    url:  {
        type:String,
        required: false
    },
    formConfig: {
        type: Object,
        required: false
    }
});

const FormMeta = mongoose.model('formMeta',formMeta);


module.exports = FormMeta;