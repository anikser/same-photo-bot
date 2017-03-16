'use strict'

const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const app = express();

const interaction = require('./bot/interaction.js');
const postservice = require('./bot/postservice.js');
const imageservice = require('./bot/imageservice.js');
const conf = require('./secrets/conf.js');

app.use(bodyParser.json());

app.set('port',(process.env.PORT || conf.PORT));

//setup letsencrypt
var SSL_CONF = {
    key : fs.readFileSync(conf.SSL.KEY),
    cert : fs.readFileSync(conf.SSL.CERT),
    ca : fs.readFileSync(conf.SSL.CA)
};


function startServer() {
    https.createServer(SSL_CONF, app).listen(app.get('port'), function (){
        console.log('Server running.');
    });

    app.get('/',function(req, res){
	      res.send('The Same Photo of Michael Christie Every Day');
    });
    app.get('/image', function(req, res){
			  console.log("Image Requested");
        res.sendFile(imageservice.getImageFilepath());
    });
		app.get('/privacypolicy', function(req, res){
		    res.sendFile(conf.PRIVACY_POLICY_FILEPATH);	
		});
    app.get('/webhook', interaction.initializeHook);
    app.post('/webhook', interaction.handleMessage);
}


console.log("Initializing post service...");
postservice.initializeQueue(function() {
    console.log("Starting Scheduling Service.");
    var rule = new schedule.RecurrenceRule();
    rule.hour = conf.POST_TIME.HOUR;
    rule.minute = conf.POST_TIME.MINUTE;

    var postschedule = schedule.scheduleJob(rule, function(){
        postservice.makePost();
    });
    console.log("Post Scheduling Service Started.");
    startServer();
});
