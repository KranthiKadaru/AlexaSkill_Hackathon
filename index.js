// HackState code: Lambda funtion for Alexa skill

exports.handler = function (event, context) {
    try {
        
        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};


function onSessionStarted(sessionStartedRequest, session) {
   
}

//When you start your skill
function onLaunch(launchRequest, session, callback) {
    
    var speechOutput = "Welcome to HackState"
    callback(session.attributes,
        buildSpeechletResponse(speechOutput, "", false));
}


function onIntent(intentRequest, session, callback) {
    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    
     switch(intentName) {
        
         case 'AMAZON.YESIntent':
        handleYesRequest(intent, session, callback)
        break;
         case  'AMAZON.NoIntent':
        handleNoRequest(intent, session, callback)
        break;
         case  'AMAZON.StopIntent':
        handleStopRequest(intent, session, callback)
        break;
         case  'AMAZON.CancelIntent':
        handleCanceltRequest(intent, session, callback)
        break;
         case  'Sponsors':
        handleSponsorsRequest(intent, session, callback)
        break;
        case  'Team':
        handleTeamRequest(intent, session, callback)
        break;
         case  'Thoughts':
        handleThoughtsRequest(intent, session, callback)
        break;
         case  'About':
        handleAboutRequest(intent, session, callback)
        break;
         case  'Favorite':
        handleFavoriteRequest(intent, session, callback)
        break;
            default:
        throw "Invalid intent";
   }
    
}

function onSessionEnded(sessionEndedRequest, session) {
   

}
function handleFavoriteRequest(intent, session, callback){
    callback(session.attributes,
        buildSpeechletResponse("I really like cupstaking and chicken wings", "", "false"));
}
function handleAboutRequest(intent, session, callback){
     callback(session.attributes,
 buildSpeechletResponse("HackState is a hackathon hosted at Mississippi State University. Over the duration of 24 hours, students are immersed in tech culture and encouraged to exercise their imagination to create interesting and innovative hacks.", "", "false"));
     
}
    

function handleThoughtsRequest(intent, session, callback){
    callback(session.attributes,
        buildSpeechletResponse("Hmmm not the best hackathon I have been to, but good enough", "", "false"));
     

    
}
function handleTeamRequest(intent, session, callback){
    callback(session.attributes,
        buildSpeechletResponse("Hackstate is organized by Natalie Larkin, Courtney Atwell, Amy Farrer and Charles Boyd ", "", "false"));
}

 function handleYesRequest(intent, session, callback){
     callback(session.attributes,
        buildSpeechletResponse("Okay..", "", "false"));
     
 }
       
  function handleNoRequest(intent, session, callback){
      callback(session.attributes,
        buildSpeechletResponse("NO intent working", "", "false"));
  }
       
 function handleStopRequest(intent, session, callback){
     callback(session.attributes,
        buildSpeechletResponse("Am I annoying you?", "", "false"));
 }
      
  function handleCanceltRequest(intent, session, callback){
      callback(session.attributes,
        buildSpeechletResponse("", "", "false"));
  }
       
   function handleSponsorsRequest(intent, session, callback){
       callback(session.attributes,
        buildSpeechletResponse("Hackstate is sponsored by babel street, circadence, International paper, Adtran, horne cyber and many more", "", "false"));
   }
       


function buildSpeechletResponse(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}