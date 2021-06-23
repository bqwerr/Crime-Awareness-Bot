import argparse
import uuid
from google.cloud import dialogflow
import os
from .crimedata_process import *
import json
from .crimedata_process import helper

# get credentials from Google Cloud Console
credentials = os.path.join(os.path.dirname(os.path.dirname(__file__)),'cbot-dhol-4c17b41f6b00.json')
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials


    
def detect_intent_texts(project_id, session_id, texts, language_code):
    entities = {
        'date-period': '',
        'geo-city': '',
        'geo-state': '',
        'HL': '',
        'crimes': ''
    }

    """
    Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation.
    
    """
   
    session_client = dialogflow.SessionsClient()
   
    session = session_client.session_path(project_id, session_id)
    print("Session path: {}\n".format(session))

    for text in texts:
        text_input = dialogflow.TextInput(text=text, language_code=language_code)

        query_input = dialogflow.QueryInput(text=text_input)

        response = session_client.detect_intent(
            request={"session": session, "query_input": query_input}
        )
       
        print("=" * 20)
        print("Query text: {}".format(response.query_result.query_text))
        print(
            "Detected intent: {} (confidence: {})\n".format(
                response.query_result.intent.display_name,
                response.query_result.intent_detection_confidence,
            )
        )
        res = response.query_result.fulfillment_text
       
        if response.query_result.intent.display_name == 'CrimeStats':
            query_result = response.query_result
            parameters = query_result.parameters
            keys = parameters.keys()
            for key in keys:
                t = []
        
                if isinstance(parameters[key], str):
                    t = parameters[key]
                
                elif key == 'crimes':
                    t = parameters[key]
                else:
                    for x in parameters[key]:
                        t.append(parameters[key][x])

                if entities[key] == '':     
                    entities[key] = t
        
            if entities['date-period']:
                entities['date-period'] = int(entities['date-period'][0][:4])
            print(entities)
            res = helper(entities)
        
        return res

def start(texts):
    #project ID of your dialogflow agent
    project_id = 'cbot-dhol'
    session_id = str(uuid.uuid4())
    language_code = "en-US"
    return detect_intent_texts(project_id, session_id, texts, language_code)