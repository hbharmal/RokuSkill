const Alexa = require('alexa-sdk');
const server_info = require('./server_info');
var http = require("http");

// App_ID associated with the alexa skill
const APP_ID = server_info.appId;

var AlexaRoku = function() {
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// function to send request to Roku Control Server 
function sendRequest(path, body, callback) {

    // options for the HTTP request
    var options = {
        host: server_info.host,
        port: server_info.port,
        path: path, 
        method: 'POST',
        header: {
            'Authorization': server_info.pass
        }
    }

    var request = http.request(options, response => {
        callback();
        response.setEncoding('utf-8');
        response.on('data', data => {
            console.log('Response: ', data);
        });
    });

    if (body) {
        request.write(body)
        request.end();
    }
}

const LaunchEventHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        sendCommand("/roku/home", null, function() {
            return responseBuilder
                .speak("Launching Roku")
                .reprompt("What can I help you with")
                .getResonse()
        });
    }
}