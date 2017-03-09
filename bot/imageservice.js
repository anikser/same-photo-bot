'use strict'

const imghash = require('imghash');
const hamming = require('compute-hamming');
const fs = require('fs');
const request = require('request');

const conf = require('../secrets/conf.js');

var image_filepath = conf.BASE_IMAGE_FILEPATH;

var mod = module.exports = {};

mod.checkHash = function(filepath, callback){
    imghash.hash(filepath, 16)
      .then((hash)=>{
      console.log(hash);
      callback(hash);
    });
};

mod.compHash = function(hash1, hash2, callback){
    let dist = hamming(hash1, hash2);
    console.log("Hamming Distance: " + dist);
    if (dist <= conf.MAX_HAMMING_DISTANCE){
        console.log("Image Similar Enough");
        callback(true);
    }else{
        console.log("Image Not Similar Enough");
        callback(false);
    }
}

mod.downloadImage = function(imgurl, filepath, callback){
    request.head(imgurl, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    let wstream = fs.createWriteStream(filepath);
    request(imgurl).pipe(wstream).on('close', callback);
  });
};

mod.getImageFilepath = function(){
  return image_filepath;
}

mod.setImageFilepath = function(path){
  image_filepath = path;
}