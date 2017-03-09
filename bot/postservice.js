'use strict'

const conf = require('../conf');
var MongoClient = require('mongodb').MongoClient;
const mongoDbQueue = require('mongodb-queue');

var db;
var queue;
var image_filepath = conf.BASE_IMAGE_FILEPATH;

var mod = module.exports = {};

mod.initializeDB = function(){
    MongoClient.connect(conf.DB_URL, function(err, newdb) {
    if (err) {
      return console.log(err);
    }
    db = newdb;
    queue = mongoDbQueue(db, 'to-post');
  });
}

mod.makePost = function(){
    mod.queuePop(function(userid, filepath){
        image_filepath = filepath;

        //need to add @mention tag
        let messagebody = 
        {
            caption: "This is a caption.",
            url: HOST_NAME + '/image'
        }

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

mod.checkQueueMembership = function(userid){
    db.collection('to-post').indexExists(userid, function(err, result){
        return result;
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