from django.db import models

# Create your models here.

class Lead(models.Model):
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    phone=models.IntegerField()
    email=models.EmailField()
    #status=models.CharField()
