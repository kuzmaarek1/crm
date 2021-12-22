from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Lead(models.Model):
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    phone=models.IntegerField()
    email=models.EmailField()
    created_by = models.ForeignKey(User, related_name='create_lead', on_delete=models.CASCADE)
