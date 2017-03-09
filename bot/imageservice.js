'use strict'

const imghash = require('imghash');
const hamming = require('compute-hamming');
const fs = require('fs');
const request = require('request');

const conf = require('../secrets/conf.js');



var mod = module.exports = {};

mod.checkHash = function(filepath){
    return imghash.hash(filepath)
};

mod.compHash = function(hash1, hash2){
    let dist = hamming(hash1, hash2);
    if (dist <= conf.MAX_HAMMING_DISTANCE){
        return True;
    }else{
        return False;
    }
}

mod.downloadImage = function(imgurl, filepath, callback){
    request.head(imgurl, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(imgurl).pipe(fs.createWriteStream(filepath)).on('close', callback);
  });
};

