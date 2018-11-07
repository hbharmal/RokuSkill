const Alexa = require('ask-sdk-core');
const server_info = require('./server_info');
var http = require("http");

// App_ID associated with the alexa skill
const APP_ID = server_info.appId;

const skillBuilder = Alexa.SkillBuilders.custom();

