var http = require("http");  // http module allows data trasnfer via HTTP
var fs = require("fs");  // fs module allows node to interact with file system on computer
var url = require("url");  // url module splits url into readeable parts
var client = require("node-ssdp").Client // ssdp module for Simple Service Discovery Protocol
var ssdp = new client({});

var server_info = JSON.parse(fs.readFileSync('server_info.json').toString())
var channels = JSON.parse(fs.readFileSync('channels.json').toString())
var rokuAddress = '192.168.0.125';
var port = '8060';
var keyDelay = 100;

// find a roku device using ssdp 
ssdp.on('response', function(headers, statusCode, remoteInfo) {
    if (headers.ST == 'roku:ecp') {
        // console.log(`Found roku device with address ${headers.LOCATION}`);
        var q = url.parse(headers.LOCATION);
        rokuAddress = q.hostname; 
        port = q.port;
        console.log(rokuAddress, port)
        clearInterval(rokuSearch);
    }
});

if (!rokuAddress) {
    rokuSearch = setInterval(function searchForRoku() {
        ssdp.search('roku:ecp')
    }, 1000);
};

// helper function to post to a url
function post(url, callback) {
    var parse = url.parse(url);
    console.log("Posting: ", url);
    var options = {
        host: parse.host,
        port: parse.port,
        path: parse.path, 
        method: 'POST'
    }
    var request = http.request(options, callback);
    request.end()
}

// helper function to get data from a post request
function getRequestData(request, callback) {
    var body = "";
    request.on('data', data => {
        body += data.toString();
    });
    request.on('end', function() {
        callback(data);
    });
}

// performs a list of POST requests in order (sequence is an array of string and possibly numbers)
function postInOrder(sequence, callback) {
    function handler() {
        if (sequence.length == 0) {
            if (callback) {
                callback;
            } else {
                return;
            }
        }
        // remove first element of prototype 
        var next = sequence.shift();
        if (typeof next === "number") {
            setTimeout(handler, next);
        } else if (typeof next === "string") {
                post(next, response => {
                response.on('data', function() { });
            });
        }
    }
    handler();
}

// For keyboard input commands, have to prefix with Lit_
function handleKeyboardSequence(text) {
    var sequence = [];
    for (let i = 0; i < text.length; i++) {
        const c = text.charCodeAt(i);
        // check if it is a space
        if (c === 20) {
            sequence.push(rokuAddress+"keyPress/Lit_"+"%20");
        } else {
            sequence.push(rokuAddress+"keyPress/Lit_"+text.charAt(i));
        }
        sequence.push(keyDelay);
    }
    return sequence;
}

// Generate a repeated key response and perform post request
function generateRepeatedKeyResponse(key, count) {
    var sequence = [];
    for (let i = 0; i < count; i++) {
        sequence.push(rokuAddress+key);
        sequence.push(keyDelay);
    }
    return function(request, response) {
        postInOrder(sequence);
        response.end("OK");
    }
}

// handlers for interacting with roku device 
var handlers = {
    "/roku/playlast":function(request,response) {
        postInOrder([
            rokuAddress+"keypress/home",    //wake the roku up, if its not already
            rokuAddress+"keypress/home",    //go back to the home screen (even if we're in netflix, we need to reset the interface)
            3000,                           //loading the home screen takes a few seconds
            rokuAddress+"launch/"+ rokuChannel['netflix'],        //launch the netflix channel (presumably this is always id 12..)
            7000,                           //loading netflix also takes some time
            rokuAddress+"keypress/down",    //the last searched item is always one click down and one click to the right of where the cursor starts
            rokuAddress+"keypress/right",
            1000,                           //more delays, experimentally tweaked.. can probably be significantly reduced by more tweaking
            rokuAddress+"keypress/Select",  //select the show from the main menu
            3000,                           //give the show splash screen time to load up
            rokuAddress+"keypress/Play"     //play the current/next episode (whichever one comes up by default)
        ]);
        response.end("OK");
    },

    "/roku/downtwo":generateRepeatedKeyResponse("keypress/down",2),
    "/roku/downthree":generateRepeatedKeyResponse("keypress/down",3),
    "/roku/downfour":generateRepeatedKeyResponse("keypress/down",4),
    "/roku/downfive":generateRepeatedKeyResponse("keypress/down",5),

    "/roku/uptwo":generateRepeatedKeyResponse("keypress/up",2),
    "/roku/upthree":generateRepeatedKeyResponse("keypress/up",3),
    "/roku/upfour":generateRepeatedKeyResponse("keypress/up",4),
    "/roku/upfive":generateRepeatedKeyResponse("keypress/up",5),

    "/roku/righttwo":generateRepeatedKeyResponse("keypress/right",2),
    "/roku/rightthree":generateRepeatedKeyResponse("keypress/right",3),
    "/roku/rightfour":generateRepeatedKeyResponse("keypress/right",4),
    "/roku/rightfive":generateRepeatedKeyResponse("keypress/right",5),

    "/roku/lefttwo":generateRepeatedKeyResponse("keypress/left",2),
    "/roku/leftthree":generateRepeatedKeyResponse("keypress/left",3),
    "/roku/leftfour":generateRepeatedKeyResponse("keypress/left",4),
    "/roku/leftfive":generateRepeatedKeyResponse("keypress/left",5),

    "/roku/captionson":function(request,response) {
        postInOrder([
            rokuAddress+"keypress/info",    //this function only works with a Roku TV, as a regular roku's caption's sequence is based on the individual app.
            keyDelay,
            rokuAddress+"keypress/down",    
            keyDelay,
            rokuAddress+"keypress/down",   
            keyDelay,
            rokuAddress+"keypress/down",    
            keyDelay,
            rokuAddress+"keypress/down",    
            keyDelay,                           
            rokuAddress+"keypress/down",    
            keyDelay,                           
            rokuAddress+"keypress/right",    
            keyDelay,
            rokuAddress+"keypress/info",    //presses info a second time to exit menu
            keyDelay,                           
        ]);
        response.end("OK"); 
    },

    "/roku/captionsoff":function(request,response) {
        postInOrder([
            rokuAddress+"keypress/info",    //this function only works with a Roku TV, as a regular roku's caption's sequence is based on the individual app.
            keyDelay,
            rokuAddress+"keypress/down",    
            keyDelay,
            rokuAddress+"keypress/down",   
            keyDelay,
            rokuAddress+"keypress/down",    
            keyDelay,
            rokuAddress+"keypress/down",    
            keyDelay,                          
            rokuAddress+"keypress/down",    
            keyDelay,                           
            rokuAddress+"keypress/left",    
            keyDelay,          
            rokuAddress+"keypress/info",    //presses info a second time to exit menu
            keyDelay,                 
        ]);
        response.end("OK"); 
    },

    "/roku/type":function(request,response) {
        getRequestData(request,function(data) {
            var text = data.replace().toLowerCase(); 
            var sequence = handleKeyboardSequence(text);
            postInOrder(sequence, function() {
            });
            response.end("OK");    
        });
    },
    //Takes the POST data and uses it to search for a show and then immediate plays that show
    "/roku/search":function(request,response) {
        getRequestData(request,function(data) {
          var text = data.replace().toLowerCase();
          postInOrder([
              searchAllChannels(rokuAddress, text),
          ],function(){

          });
          response.end("OK");
        });
    },
    //Takes the POST data and uses it to search for a show on a specific channel
    "/roku/searchChannel":function(request,response) {
        getRequestData(request,function(data) {
          var slotArray = data.split('&');
          var text = slotArray[0].replace().toLowerCase();
          var channel = slotArray[1].replace().toLowerCase();
          postInOrder([
              searchChannel(rokuAddress, text, rokuChannel[channel]),
          ],function(){

          });
          response.end("OK");
        });
    },
    "/roku/playlastyoutube":function(request,response) {    //not working yet - youtube search does not allow keyboard input. Next best thing is to play most recent.
        getRequestData(request,function(data) {
            var sequence = [].concat([
                rokuAddress+"keypress/home",    //wake roku
                keyDelay,
                rokuAddress+"launch/"+ rokuChannel['youtube'],        //launch youtube app
                6000,
                rokuAddress+"keypress/up",    //navigate to search
                200,
                rokuAddress+"keypress/up",  //Navigate to search
                200,
                rokuAddress+"keypress/select",  //select search
                200,
                rokuAddress+"keypress/up",   //go to search selections (which show up to the right of they keyboard.. we need to tap through them)
                200,
                rokuAddress+"keypress/select",
                2500,
                rokuAddress+"keypress/select", //selected the top result and returns to the main screen
                2500,                          //wait for main menu
            ]);
            postInOrder(sequence);
            response.end("OK");     //respond with OK before the operation finishes
        });
    },
    "/roku/playpause":function(request,response) {        //the play and pause buttons are the same and is called "Play"
        post(rokuAddress+"keypress/Play");
        response.end("OK");    
    },
    "/roku/power":function(request,response) {        //Only for roku TV - can only turn TV OFF....not On, as once it is turned off, it will disable the network,
        post(rokuAddress+"keypress/Power");
        response.end("OK");    
    },
    "/roku/rewind":function(request,response) {        //rewind
        post(rokuAddress+"keypress/rev");
        response.end("OK");    
    },
    "/roku/fastforward":function(request,response) {    //fast forward
        post(rokuAddress+"keypress/fwd");
        response.end("OK");    
    },
    "/roku/up":function(request,response) {            //up
        post(rokuAddress+"keypress/up");
        response.end("OK");    
    },
    "/roku/down":function(request,response) {        //down
        post(rokuAddress+"keypress/down");
        response.end("OK");    
    },
    "/roku/back":function(request,response) {        //back
        post(rokuAddress+"keypress/back");
        response.end("OK");    
    },
    "/roku/left":function(request,response) {        //left
        post(rokuAddress+"keypress/left");
        response.end("OK");    
    },
    "/roku/instantreplay":function(request,response) {    //instant replay, go back 10 secounds
        post(rokuAddress+"keypress/instantreplay");
        response.end("OK");    
    },
    "/roku/right":function(request,response) {        //right
        post(rokuAddress+"keypress/right");
        response.end("OK");    
    },
    "/roku/select":function(request,response) {        //select - this is often more useful than play/pause - same as OK on the remote
        post(rokuAddress+"keypress/select");
        response.end("OK");    
    },
    "/roku/home":function(request,response) {
        post(rokuAddress+"keypress/home");
        response.end("OK");    
    },
    "/roku/nextepisode":function(request,response) {    //NOT being utilized right now, needs tweaking
        postInOrder([
            rokuAddress+"keypress/back",
            1000,
            rokuAddress+"keypress/down",
            keyDelay,
            rokuAddress+"keypress/down",
            keyDelay,
            rokuAddress+"keypress/select",
            2000,
            rokuAddress+"keypress/right",
            keyDelay,
            rokuAddress+"keypress/select",
            1000,
            rokuAddress+"keypress/Play",
        ],function() {

        });
        response.end("OK");
    },

    "/roku/lastepisode":function(request,response) {    //NOT being utilized right now, needs tweaking
        postInOrder([
            rokuAddress+"keypress/back",
            1000,
            rokuAddress+"keypress/down",
            keyDelay,
            rokuAddress+"keypress/down",
            keyDelay,
            rokuAddress+"keypress/select",
            2000,
            rokuAddress+"keypress/left",
            keyDelay,
            rokuAddress+"keypress/select",
            1000,
            rokuAddress+"keypress/Play",
        ],function() {

        });
        response.end("OK");
    },

    "/roku/launch":function(request,response) {  //function to open a roku channel from the channel list
        getRequestData(request, function(data) {
            var channelRequest = data.replace().toLowerCase();
            console.log("Loading Channel: " + channelRequest);
            if (channels[channelRequest]) {
                postInOrder([rokuAddress + "launch/" + channels[channelRequest]], function () {
                });
                response.end("OK");
            } else {
                console.log('Channel not found.');
                response.end("Channel not found.");
            }
        });
        response.end("OK");     //respond with OK before the operation finishes
    }
}

function handleRequest(request, response) {
    if (request.headers.authorization != server_info.pass) {
        console.log("Authorization denied!");
        response.end();
        return;
    }
    if (handlers[request.url]) {
        handlers[request.url](request, response);
    } else {
        console.log("Invalid Request URL: ", request.url);
        response.end();
    }
}

function searchChannel(address, title, channelID) {
    return address + "/search/browse?title=" + title + "&provider-id=" + channelID + "&launch=true&match-any=true";
}

function searchAllChannels(address, title) {
    var ids = Object.keys(channels).map(channel => {
        return channels[channel]
    }).filter(id => {
        return Number(id);
    }).join('%2c');
    
    return address + "/search/browse?title=" + title + "&provider-id=" + ids + "&launch=true&match-any=true";

}

http.createServer(handleRequest).listen(server_info.port, function() {
    console.log("Server listening on port ", server_info.port);
});
