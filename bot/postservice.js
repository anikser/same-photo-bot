'use strict'

const conf = require('../secrets/conf.js');
const request = require('request');
var MongoClient = require('mongodb').MongoClient;
const mongoDbQueue = require('mongodb-queue');

const imageservice = require('./imageservice.js');

var db;
var queue;

var mod = module.exports = {};

mod.initializeDB = function(callback){
    MongoClient.connect(conf.DB_URL, function(err, newdb) {
    if (err) {
      return console.log(err);
    }
    db = newdb;
    queue = mongoDbQueue(db, 'to-post');
    callback();
  });
}

mod.makePost = function(){
    mod.queuePop(function(userid, filepath){
        imageservice.setImageFilepath(filepath);

        //need to add @mention tag
        let messagebody = 
        {
            caption: "This is a caption.",
            url: conf.HOST_NAME + '/image'
        };

        request(
        {
            url: conf.API_POST_URL,  
            qs: { access_token: conf.ACCESS_TOKEN },
            method: 'POST',
            json: messagebody
        }, 
        function(error, response, body) {
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
        });

        queue.clean(function(err){
            console.log("Image posted, queue cleaned.");
        });
    });
};

mod.checkQueueMembership = function(userid, callback){
    db.collection('to-post').indexExists(userid, function(err, result){
        callback(result);
    });
};

mod.queuePush = function(userid, filepath, callback){
    queue.add([userid, filepath], function(err, id){
        console.log("Submission by " + userid + " saved. Id: " + id);
        callback();
    });
};

mod.queuePop = function(callback){
    queue.get(function(err, sub){
        callback(sub[0], sub[1]);
    });
};
