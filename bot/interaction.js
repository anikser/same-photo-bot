'use strict'

const request = require('request');

const imageservice = require('../bot/imageservice.js');
const postservice = require('../bot/postservice.js');
const responses = require('../resources/responses.json');
const conf = require('../secrets/conf.js');

var mod = module.exports = {};

mod.initializeHook = function(req, res) {
  if (req.query['hub.verify_token'] === conf.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid token');
    console.log('Invalid token');
  }
};

mod.handleMessage = function(req, res){
  console.log('New Message');
    
  //looping through events
  let events = req.body.entry[0].messaging;
  for (let i = 0; i < events.length; i++) {
    let object = events[i];
    let user = object.sender.id;
    //console.log(object);
    if (object.message.is_echo){
      continue;
    }

    //check message for image attachment
    if (object.message.hasOwnProperty("attachments") && object.message.attachments[0].type == "image"){
      console.log("Recieved Image");

      //check user not already in posting queue
      if (!postservice.checkQueueMembership(user)){
        //download image
        let imgurl = object.message.attachments[0].payload.url;
        //console.log(imgurl);
        let filepath = conf.IMAGE_DOWNLOAD_FILEPATH + user;
        console.log(filepath);
        imageservice.downloadImage(imgurl, filepath, function(){
          console.log("Image Downloaded");

          //check image validity
          imageservice.checkHash(conf.BASE_IMAGE_FILEPATH, function(hash1){
            imageservice.checkHash(filepath, function(hash2){
              imageservice.compHash(hash1, hash2, function(valid){
                if (valid){
                  postservice.queuePush(user, filepath, function(){
                    mod.sendResponse("SUCCESS", user);
                    /*
                    postservice.queuePush(user, filepath, function(){
                      postservice.makePost();
                    });
                    */
                  });
                }else{
                  imageservice.deleteImage(filepath);
                  mod.sendResponse("INVALID_IMAGE", user);
                }
              });
            });
          });  
        });
      }else{
        mod.sendResponse("QUEUE_LIMIT", user);
      }
    }else{
      mod.sendResponse("NO_IMAGE", user);
    }
  }
  res.sendStatus(200);
};

mod.sendResponse = function(response, userid){
  console.log(responses[response]["console-output"]);
  let ans = responses[response]["user-response"]
  if (response == "SUCCESS"){
    ans += postservice.getQueueLength();
  }
  let messagebody = {
    recipient: {id: userid},
    message: {text: ans}
  }
  //console.log(messagebody);


  request(
  {
    url: conf.API_MESSAGE_URL,
    method: 'POST',
    qs: { access_token: conf.ACCESS_TOKEN },
    json: messagebody
  }, 
  function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
  
};
