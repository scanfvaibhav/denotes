const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 33,
        trim: true
      },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100000,
        trim: true
      },
    details: {
        type: Object,
        required: true
      },
    time :{
      type: Date,
      required:true
    }
});

const Post = mongoose.model('Post', postSchema);


module.exports = Post;