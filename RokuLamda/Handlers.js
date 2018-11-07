const LaunchRequest = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'LaunchRequest'
	}, 
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/home", null, function() {
			return responseBuilder
				.speak("Launching Roku")
				.reprompt("What can I help you with?")
				.getResponse()
		})
	}
}

// All the intent handlers
const HomeIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Home'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/home", null, function() {
			return responseBuilder
				.speak("Opening Roku home page")
				.getResponse()
		})
	}
}

const LaunchIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Launch'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/launch", intent.slots.Channel.value, function() {
			return responseBuilder
				.speak("Launching " + intent.slots.Channel.value)
				.getResponse()
		})
	}
}

const CaptionsIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.name;
		return request === 'IntentRequest' && name == 'Captions'
	},
	handle(handlerInput) {
		const setting = intent.slots.Setting.value.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/captions" + setting, null, function() {
			return responseBuilder
				.speak("Captions are turned " + setting)
				.getResponse()
		});
	}
}

const SelectIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Select'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/select", null, function() {
			return responseBuilder
				.speak("Ok, I selected the item")
				.getResponse()
		})
	}
}

const BackIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Back'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/back", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const TVIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'TV'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/tv", null, function() {
			return responseBuilder
				.speak("Opening TV")
				.getResponse()
		})
	}
}

const RewindIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Rewind'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/rewind", null, function() {
			return responseBuilder
				.speak("Rewinding")
				.getResponse()
		})
	}
}


const FastForwardIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'FastForward'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/fastforward", null, function() {
			return responseBuilder
				.speak("Fast forwarding")
				.getResponse()
		})
	}
}

const InstantReplayIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'InstantReplay'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/instantreplay", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const UpIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.name;
		return request === 'IntentRequest' && name == 'Up'
	},
	handle(handlerInput) {
		const amount = intent.slots.Amount.value.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/up" + amount, null, function() {
			return responseBuilder
				.speak("You got it! Going up " + amount)
				.getResponse()
		});
	}
}

const DownIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Down'
	},
	handle(handlerInput) {
		const amount = intent.slots.Amount.value.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/down" + amount, null, function() {
			return responseBuilder
				.speak("You got it! Going down " + amount)
				.getResponse()
		})
	}
}

const LeftIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Left'
	},
	handle(handlerInput) {
		const amount = intent.slots.Amount.value.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/left" + amount, null, function() {
			return responseBuilder
				.speak("You got it! Going left " + amount)
				.getResponse()
		})
	}
}

const RightIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Right'
	},
	handle(handlerInput) {
		const amount = intent.slots.Amount.value.toLowerCase()
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/right" + amount, null, function() {
			return responseBuilder
				.speak("You got it! Going right " + amount)
				.getResponse()
		})
	}
}

const PowerIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Power'
	},
	handle(handlerInput) {
		const name = request.intent.name;
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("Powering off Roku TV, Goodbye")
				.getResponse()
		})
	}
}

const TypeIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Type'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/type", intent.slots.Text.value, function() {
			return responseBuilder
				.speak("Typing text: " + intent.slots.Text.value)
				.getResponse()
		});
	}
}

const PlayIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Play'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/playpause", null, function() {
			return responseBuilder
				.speak("Paused")
				.getResponse()
		});
	}
}

const SearchIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Search'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/search", null, function() {
			return responseBuilder
				.speak("Searching")
				.getResponse()
		});
	}
}


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



