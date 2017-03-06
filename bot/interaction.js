'use strict'

const FB = require('fb');

const conf = require('../secrets/conf.js');
const imageservice = require('../bot/imageservice.js');


var mod = module.exports = {};

mod.initializeBot = function(req, res) {
  if (req.query['hub.verify_token'] === conf.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid token');
  }
};

mod.handleMessage = function(req, res){
    let update = req.body.entry;
    let changes = update.changes
    console.log(update)
    console.log(changes)

    //check image presence
    
    //check image validity
    
    //check person not in post queue
    
    //add to post queue

};

