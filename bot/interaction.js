'use strict'

const FB = require('fb');

const conf = require('../secrets/conf.js');
const imageservice = require('../bot/imageservice.js');
const responses = require('../static/responses.json')

var mod = module.exports = {};

mod.initializeBot = function(req, res) {
  if (req.query['hub.verify_token'] === conf.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid token');
    console.log('Invalid token');
  }
};

mod.handleMessage = function(req, res){
    let update = req.body.entry;
    let changes = update.changes
    console.log('New Message');

    console.log(update)
    console.log(changes)

    //check image presence
    var filepath = 'filepathofsaved'

    //check image validity
    if (imageservice.compHash(imageservice.checkHash(conf.BASE_IMAGE_FILEPATH), imageservice.checkHash(filepath))){
      if(!postservice.checkQueueMembership()){
        postservice.addToQueue(filepath, name);
        self.sendResponse(SUCCESS);
      }else{
        self.sendResponse(QUEUE_LIMIT);
      }
    }else{
      self.sendResponse(INVALID_IMAGE);
    }
};

mod.sendResponse = function(response){

};
