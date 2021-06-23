from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.http import HttpResponseRedirect
from . training import predict, train
# rest-framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . dialogflow import *
from .crimedata_process import get_by_state

# Create your views here.
@api_view(['POST'])
def get_reply(request):
    message = request.data["message"]
    response = predict(message)
    # response = None
    if response == None:
        response = start([message])
    return Response({"response" : response})

@api_view(['GET'])
def train_model(request):
    train()
    return Response({"status" : "success"})

@api_view(['POST'])
def get_stats_by_state(request):
    stats = get_by_state(request.data['state'])
    # print(stats)
    json_result = {
        "stats": stats
    }
    
    return Response(json_result)
