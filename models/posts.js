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
        maxlength: 33,
        trim: true
      },
    details: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 33,
        trim: true
      }
});

const Post = mongoose.model('Post', postSchema);


module.exports = Post;