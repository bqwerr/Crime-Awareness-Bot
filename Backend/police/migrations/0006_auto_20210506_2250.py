# Generated by Django 3.1.7 on 2021-05-06 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('police', '0005_auto_20210505_1255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compliant',
            name='category',
            field=models.CharField(choices=[('Cognizable', 'Cognizable'), ('Non Cognizable', 'Non Cognizable'), ('Missing Report', 'Missing Case'), ('Theft Report', 'Theft')], max_length=50, null=True),
        ),
    ]
