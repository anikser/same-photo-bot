'use strict'

const fs = require('fs');
const fb = require('fb');
const http = require('http');
const express = require('express');
const request = require('request');
const app = express();

const conf = require('./conf.js');


app.set('port',(process.env.PORT || 3000));

/*var SSL_CONF = {
    key : fs.readFileSync(conf.SSL.KEY),
    cert : fs.readFileSync(conf.SSL.CERT),
    ca : fs.readFileSync(conf.SSL.CA)
};*/


fb.setAccessToken(conf.ACCESS_TOKEN);

function startServer() {
    http.createServer(app).listen(app.get('port'), function (){
        console.log('Server running.');
    });
    app.get('/','The Same Photo of Michael Christie Every Day');
}
