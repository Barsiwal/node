var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    router.get('/success', function (req, res) {
        return res.send({
            state: 'ok',
            user: req.user
        });
    });
    router.get('/fail', function (req, res) {
        return res.send( {
            state: 'fail',
            user: null
        });
    });
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/fail'
    }));
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/fail'
    }));
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};
