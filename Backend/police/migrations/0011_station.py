# Generated by Django 3.1.7 on 2021-05-19 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('police', '0010_auto_20210518_1510'),
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('head', models.CharField(max_length=30, null=True)),
                ('mobile', models.CharField(max_length=10)),
                ('lat', models.CharField(max_length=20)),
                ('lon', models.CharField(max_length=20)),
                ('zone_name', models.CharField(max_length=30, null=True)),
            ],
        ),
    ]
