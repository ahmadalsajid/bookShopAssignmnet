var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Reader = require('../models/reader');
var Publisher = require('../models/publisher');
var fs = require('fs');
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        if (user.roll==='publisher') {
            Publisher.findById(user._id, function(err, user) {
                done(err, user);
            });
        } else {
            Reader.findById(user._id, function(err, user) {
                done(err, user);
            });
        }

    });

    /*
     passport.serializeUser(function(user, done) {
     done(null, user.id);
     });

     passport.deserializeUser(function(id, done) {
     Reader.findById(id, function(err, user) {
     done(err, user);
     });
     });
     */


    //verify or create reader
    passport.use('reader-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {

            process.nextTick(function() {
                Reader.findOne({ 'email':  email }, function(err, user) {


                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        console.log(req.files);
                        var newReader = new Reader();
                        newReader.name =req.body.name,
                        newReader.password = newReader.generateHash(password);
                        newReader.email = email;
                        newReader.address = req.body.address;
                        newReader.mobile = req.body.mobile;
                        // need to store image
                        newReader.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newReader);
                        });
                    }
                });
            });
        }));

    //verify or create publisher
    passport.use('publisher-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {

            process.nextTick(function() {
                Publisher.findOne({ 'email':  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newPublisher = new Publisher();
                        newPublisher.name = req.body.name;
                        newPublisher.password = newPublisher.generateHash(password);
                        newPublisher.email = email;
                        newPublisher.address = req.body.address;
                        newPublisher.contact = req.body.contact;
                        newPublisher.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newPublisher);
                        });
                    }
                });
            });
        }));


    //authenticate login
    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            //if the roll is reader then validate reader
            if ( req.body.roll ==='Reader' ) {
                Reader.findOne({ 'email':  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    return done(null, user);
                });
            }
            //if the roll is publisher then validate publisher
            else if ( req.body.roll ==='Publisher' ) {
                Publisher.findOne({ 'email':  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    return done(null, user);
                });
            }


        }));


};
