'use strict'

const request = require('request');
const jsonfile = require('jsonfile');

const imageservice = require('./imageservice.js');
const conf = require('../secrets/conf.js');

var queue;
var captions;

var mod = module.exports = {};

mod.initializeQueue = function(callback){
  queue = jsonfile.readFileSync(conf.QUEUE_FILEPATH);
  console.log(queue);
  captions = jsonfile.readFileSync(conf.CAPTIONS_FILEPATH); 
  callback();
};

mod.makePost = function(){
  console.log("Posting Image...");
  mod.queuePop(function(userid, filepath){
    imageservice.setImageFilepath(filepath);
      
    let randcap = captions.captions[Math.floor(Math.random() * captions.captions.length)];
    console.log(randcap);
    if (randcap.includes("_")){
      console.log("Requesting user data");
      request(
      {
        url:  conf.API_USER_URL+userid,
        method: 'GET',
        qs: { access_token: conf.ACCESS_TOKEN }
      }, function(err, response){
        if (err){
          throw err;
        }else{
          console.log("Success");
          let obj = JSON.parse(response.body);
          let namedcap = randcap.replace("_", obj.first_name+" "+obj.last_name);
          console.log(namedcap);
          mod.publish(userid, namedcap);
        }
      });
    }
  });
};

mod.publish = function(userid, cap){
  let messagebody = 
  {
    caption: cap,
    tags:
    [
      {
      x: 0,
      y: 0,
      tag_uid: userid,
      tag_text: "Feeling blessed"
      }
    ],
    url: conf.HOST_NAME + '/image'
  };

  request(
  {
    url: conf.API_IMAGEPOST_URL,  
    qs: { access_token: conf.ACCESS_TOKEN },
    method: 'POST',
    json: messagebody
  }, 
  function(err, response, body) {
    if (err) {
      console.log('Error making post: ', err);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};

mod.checkQueueMembership = function(userid){
  for (var obj in queue.queue){
    if (obj.hasOwnProperty(userid)){
      return true;
    }
  }
  return false;
};

mod.queuePush = function(userid, filepath, callback){
  let temp = {};
  temp[userid] = filepath;
  queue.queue.push(temp);
  console.log(queue);
  jsonfile.writeFileSync(conf.QUEUE_FILEPATH, queue);
  callback();
};

mod.queuePop = function(callback){
  let temp = queue.queue.pop(0);
  jsonfile.writeFileSync(conf.QUEUE_FILEPATH, queue);
  callback(Object.keys(temp)[0], temp[Object.keys(temp)[0]]);
};
