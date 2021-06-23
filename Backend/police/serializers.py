from rest_framework import serializers
from .models import *

# serializing models

class AnnouncementSerializer(serializers.ModelSerializer):
	class Meta:
		model = Announcement
		fields = '__all__'
class CompliantSerializer(serializers.ModelSerializer):
	class Meta:
		model = Compliant
		fields = '__all__'
class AlertsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Alerts
		fields = '__all__'
class StationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Station
		fields = '__all__'
