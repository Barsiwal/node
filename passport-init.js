var ls = require('passport-local');
var mongoose = require('mongoose');
var users = mongoose.model('users');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        users.findOne({
            _id:id
        },function(err,user){
            if(err){
                return done(err,false);
            }
            return done (null,user);
        })
    });
    passport.use('login', new ls({
        passReqToCallback: true
    }, function (req, username, password, done) {

        users.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                if (user.password === password) {
                    return done(null, user);
                }
            }
            return done(null, false);
        });

    }));
    passport.use('signup', new ls({
        passReqToCallback: true
    }, function (req, username, password, done) {
        users.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            var newUser = new users();
            newUser.username = username;
            newUser.password = password;
            newUser.save(function(err,newUser){
                if (err){
                    return done (err,false);
                }
                return done (null,newUser);
            });
        });
    }));
}
