from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.http import HttpResponseRedirect
from rest_framework import views
# rest-framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login

from django.contrib.auth.models import User
from .serializers import *
from .models import *

from bot.crimedata_process import get_stats as get

# Create your views here.
@api_view(['POST'])
def do_login(request):
	uid = request.data["uid"]
	password = request.data["password"]
	user = authenticate(request, username=uid, password=password)
	if user is not None:
		login(request, user)
		response = {
			"uid" : uid,
			"email" : str(uid) + "@gmail.com"
		}
	else:
		response = None
	return Response(response)

@api_view(['POST'])
def add_compliant(request):
	
	serializer =  CompliantSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	if (serializer.errors):
		return Response({'error' : 'Please provide valid inputs..'})
	return Response()

@api_view(['POST'])
def add_sos(request):
	serializer =  AlertsSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		
		return Response(serializer.data)
	print(serializer.errors)
	return Response()

@api_view(['GET'])
def get_compliants(request):
	tasks = Compliant.objects.all()
	serializer = CompliantSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def get_sos(request):
	tasks = Alerts.objects.all()
	serializer = AlertsSerializer(tasks, many=True)
	return Response(serializer.data)


@api_view(['GET'])
def get_status(request, pk):
	uid, mobile = pk.split("@")
	item = Compliant.objects.get(uid=uid, mobile=mobile)
	serializer =  CompliantSerializer(instance=item)
	return Response(serializer.data)

@api_view(['POST'])
def add_appointment(request):
	pass

@api_view(['POST'])
def add_noc(request):
	pass

@api_view(['POST'])
def add_post(request):
	serializer =  AnnouncementSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	else:
		return Response({})

@api_view(['GET'])
def get_posts(request):
	tasks = Announcement.objects.all()
	serializer = AnnouncementSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def get_zones(request):
	tasks = Station.objects.all()
	serializer = StationSerializer(tasks, many=True)
	return Response(serializer.data)


@api_view(['GET'])
def get_posts(request):
	tasks = Announcement.objects.all()
	serializer = AnnouncementSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def delete_post(request):
	item = Announcement.objects.get(id=request.data["id"])
	item.delete()
	return Response('Deleted')

@api_view(['POST'])
def update_compliant(request, pk):
	item = Compliant.objects.get(id=int(pk))
	serializer =  CompliantSerializer(instance=item, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['GET'])
def get_stats(request):
	return Response(get())