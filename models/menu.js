const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    id : {
        type:String,
        required: false
    },
    menu: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

const Menu = mongoose.model('Menu', menuSchema);


module.exports = Menu;