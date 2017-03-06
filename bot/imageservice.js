'use strict'

const imghash = require('imghash');
const hamming = require('compute-hamming');

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

