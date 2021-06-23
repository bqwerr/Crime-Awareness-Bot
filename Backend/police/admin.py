from django.contrib import admin
from . models import *

# Register your models here.
admin.site.register(Appointment)
admin.site.register(Compliant)
admin.site.register(Noc)
admin.site.register(Announcement)
admin.site.register(Alerts)
admin.site.register(Station)