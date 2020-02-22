var express = require("express");
var router = express.Router();
var Crypto = require('crypto-js');

// Import the model (auth.js) to use its database functions.
var auth = require("../models/users.js");
var cards = require("../models/cards.js");
const usersController = require("../../controllers/usersController");


// Create all our routes and set up logic within those routes where required.
router.post("/api/auth/:email", function(req, res) {
    var condition = "email = '" + req.params.email+"'"+ " and provider = '"+req.body.provider + "'";
  auth.selectOne(condition,function(data) {
    
      if(data.length>0 && data[0].provider){
        if(data[0].provider && data[0].provider == "events"){
            var encryptedPassword = Crypto.SHA256(req.body.password).toString();
            if( data[0].password == encryptedPassword){
                req.session.userid = req.params.email;
                res.json({ result:"success" });

            }else{
                
                res.json({ result:"fail" });
            }
        }else{
            req.session.userid = req.params.email;
            
            res.json({ result:"success" });
        }
    }else{
        res.json({ result:"fail" });
    }

  });
});

router.post("/api/savecard", function(req, res) {
    cards.insertOne(["cardnum","expiry","cvv","zipcode"], ["'" + req.body.cardnum + "'","'" + req.body.expiry 
    + "'","'" + req.body.cvv + "'","'" + req.body.zipcode], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
      });
});

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

router.get("/api/session", function(req,res) {
    
    if (req.session.userid) {
        res.json({ id: req.session.userid });
    } else {
        res.json({});
    }
    
});

router.delete("/api/session", function(req,res) {
    req.session.destroy(function(err) {
        res.json({});
      });
    
});
// Export routes for server.js to use.
module.exports = router;
