var mongoose = require('mongoose');
var users = new mongoose.Schema( {
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var posts = new mongoose.Schema( {
    username: String,
    post: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('users',users);
mongoose.model('posts',posts);
