const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    text: String,
    from: String,
    to: String,
    read: Boolean,
    sent: Boolean,
    received : Boolean,
    date: Date
});

const Chat = mongoose.model('Chat', chatSchema);


module.exports = Chat;