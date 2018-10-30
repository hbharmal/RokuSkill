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

const CaptionsOnIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'CaptionsOn'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/captionson", null, function() {
			return responseBuilder
				.speak("Turning on captions")
				.getResponse()
		})
	}
}

const CaptionsOffIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'CaptionsOff'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/captionsoff", null, function() {
			return responseBuilder
				.speak("Turning off captions")
				.getResponse()
		})
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
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Up'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/up", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const UpTwoIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Uptwo'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/uptwo", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const UpThreeIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Upthree'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/upthree", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const UpFourIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Upfour'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/upfour", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const UpFiveIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Upfive'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/upfive", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const DownIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Down'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/down", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const DownTwoIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Downtwo'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/downtow", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const DownThreeIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Downthree'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/downthree", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const DownFourIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Downfour'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/downfour", null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const DownFiveIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Downfive'
	},
	handle(handlerInput) {
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/downfive", null, function() {
			return responseBuilder
				.speak("You got it")
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
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}

const LeftTwoIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Lefttwo'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}


const LeftThreeIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Leftthree'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}


const LeftFourIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Leftfour'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}


const LeftFiveIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Leftfive'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
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
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}


const RightTwoIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Righttwo'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}


const RightThreeIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Rightthree'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}


const RightFourIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Rightfour'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
				.getResponse()
		})
	}
}


const RightFiveIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const name = request.intent.name;
		return request === 'IntentRequest' && name === 'Rightfive'
	},
	handle(handlerInput) {
		const name = request.intent.name.toLowerCase();
		const responseBuilder = handlerInput.responseBuilder;
		sendCommand("/roku/" + name, null, function() {
			return responseBuilder
				.speak("You got it")
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
