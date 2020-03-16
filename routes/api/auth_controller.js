var express = require("express");
var router = express.Router();
var Crypto = require('crypto-js');


// Import the model (auth.js) to use its database functions.
var auth = require("../../models/user.js");
const usersController = require("../../controllers/usersController");


// Authentication API
// Compares email and password against the database
// (It first generates the password hash for the input password before comparing)
// It also creates a session for the user (by setting a new session attribute - userid)
router.post("/api/auth/:email", function(req, res) {
    var encryptedPassword = Crypto.SHA256(req.body.password).toString();
    var condition = {
        email: req.params.email, 
        provider:  req.body.provider 
    };

    usersController.findAll(condition,function(result) {
        if(result.length > 0) {
            if(result[0].provider && result[0].provider == "events") {
                if (result[0].password == encryptedPassword) {
                    req.session.userid = req.params.email;
                    res.json({ result: "success"});
                } else {
                    res.json({result: "fail"});
                }
            } else {
                req.session.userid = req.params.email;
                res.json({result: "success"});
            }
        } else {
            res.json({result: "fail"});
        }
    }, function(err) { ;});
    
});

// Registration API
// Stores the user information in the database.
// (It generates the one-way password hash before storing it in the database)
router.post("/api/register", function(req, res) {
    var encryptedPassword = "";
    if(req.body.password != ""){
         encryptedPassword = Crypto.SHA256(req.body.password).toString();  
         req.body.password = encryptedPassword;
    }
    
    var condition = {email: req.body.email, provider: req.body.provider};

    usersController.findAll(condition,function(result) {
        if(result.length <= 0) {
            usersController.create(req,res);
        } else {
            res.json({id: result[0]._id});
        }
    });
    
});

// Session API
// Returns the userid attribute stored in the session (if any)
router.get("/api/session", function(req,res) {
    
    if (req.session.userid) {
        res.json({ id: req.session.userid });
    } else {
        res.json({});
    }
    
});

// Delete session API:
// Deletes the session
router.delete("/api/session", function(req,res) {
    req.session.destroy(function(err) {
        res.json({});
      });
});

// Export routes for server.js to use.
module.exports = router;
