from django.db import models

class Appointment(models.Model):
	uid = models.CharField(max_length=12)
	description = models.CharField(max_length=1000, null=True)
	WHOM = (
			('DGP', 'DGP'),
			('ADGP', 'ADGP'),
			('IGP', 'IGP'),
			('DIGP', 'DIGP'),
			('SP', 'SP'),
		)
	date_created = date_created = models.DateTimeField(auto_now_add=True, null=True)
	whom = models.CharField(max_length=10, null=True, choices=WHOM)
	status = models.CharField(max_length=50, default="Pending")

	def __str__(self):
		return str(self.uid)

class Noc(models.Model):
	uid = models.CharField(max_length=12)
	NEED = (

			('NOC for Employment', 'NOC for Employment'),
			('NOC for Immigration', 'NOC for Immigration'),
			('NOC for Student', 'NOC for Student'),
	   ) 
	date_created  = models.DateTimeField(auto_now_add=True, null=True)
	need = models.CharField(max_length=30, null=True, choices=NEED)
	status = models.CharField(max_length=50, default="Pending")
	def __str__(self):
		return str(self.uid)

class Announcement(models.Model):
	id = models.AutoField(primary_key=True)
	title = models.CharField(max_length=12)
	description = models.CharField(max_length=1000, null=True)
	def __str__(self):
		return str(self.title)
		
class Compliant(models.Model):
	id = models.AutoField(primary_key=True)
	uid = models.CharField(max_length=12)
	name = models.CharField(max_length=30)
	mobile = models.CharField(max_length=10)
	email = models.CharField(max_length=30)
	date_created = date_created = models.DateTimeField(auto_now_add=True, null=True)
	status = models.CharField(max_length=50, default="Pending")
	description = models.CharField(max_length=1000, null=True)
	district = models.CharField(max_length=50)
	place = models.CharField(max_length=50)
	CATEGORIES = (
		('Cognizable', 'Cognizable'),
		('Non Cognizable', 'Non Cognizable'),
		('Missing Report', 'Missing Case'),
		('Theft Report', 'Theft'),
	)
	category = models.CharField(max_length=50, null=True, choices=CATEGORIES)
	url = models.CharField(max_length=500)
	lat = models.CharField(max_length=20)
	lon = models.CharField(max_length=20)
	def __str__(self):
		return str(self.uid)


class Alerts(models.Model):
	name = models.CharField(max_length=30, null=True)
	mobile = models.CharField(max_length=10)
	date_created = date_created = models.DateTimeField(auto_now_add=True, null=True)
	lat = models.CharField(max_length=20)
	lon = models.CharField(max_length=20)
	description = models.CharField(max_length=100, null=True)

	def __str__(self):
		return str(self.description)

class Station(models.Model):
	head = models.CharField(max_length=30, null=True)
	mobile = models.CharField(max_length=10)
	lat = models.CharField(max_length=20)
	lon = models.CharField(max_length=20)
	zone_name = models.CharField(max_length=30, null=True)

	def __str__(self):
		return str(self.zone_name)