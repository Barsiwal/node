var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var posts = mongoose.model('posts');
yp = function (req, res, next) {
    if (req.method === "GET") {
       return next();
    }
    if (req.isAuthenticated()) {
       return next();
    }
    res.redirect('/#login');

};
router.use('/post', yp);
router.route('/post')
    .post(function (req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/#login');
        }
        var newpost = new posts();
        newpost.username = req.body.username;
        newpost.post = req.body.post;
        newpost.save(function(err,post){
            if(err){
                return res.send(err);
            }
            return res.json(post);
        })

    })
    .get(function (req, res) {
        posts.find(function (err, post) {
            if (err) {
                return res.send(err);
            }
            return res.send(post);
        })
    });
module.exports = router;
