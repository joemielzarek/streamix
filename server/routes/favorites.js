var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Favorite = require('../models/favorite');

// Handles Ajax request for user information if user is authenticated
router.get('/:user', function(req, res) {
    Favorite.find({
        user: req.params.user
    }, function(err, favorites) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.send(favorites);
    })

});

// clear all server session information about this user
router.get('/logout', function(req, res) {
    // Use passport's built-in method to log out the user
    console.log('Logged out');
    req.logOut();
    res.sendStatus(200);
});

//post new favorite
router.post('/', function(req, res) {
    var favorite = new Favorite(req.body);
    console.log(req.body);
    console.log("end of req.body");
    favorite.save(function(err) {
        if (err) {
          console.log(req.body);
            res.sendStatus(500);
            return;
        }
        console.log('saved!');
        res.sendStatus(201);
    })
});

router.delete('/:id', function(req, res) {
    Favorite.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(204);
    });
});


module.exports = router;
