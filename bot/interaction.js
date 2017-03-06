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
    var filepath = 'filepathofsaved'
    //check image validity
    if (imageservice.compHash(imageservice.checkHash(conf.BASE_IMAGE_FILEPATH), imageservice.checkHash(filepath))){
      postservice.addToQueue(filepath, name);
    }else{

    }
    //check person not in post queue
    
    //add to post queue

};

