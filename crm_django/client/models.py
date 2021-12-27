from django.db import models
from django.contrib.auth.models import User
from team.models import Team

class Client(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.IntegerField()
    email = models.EmailField()
    description = models.CharField(max_length=10000)
    created_by = models.ForeignKey(User, related_name='create_client', on_delete=models.CASCADE)
    team = models.ForeignKey(Team, related_name='team_client', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, related_name='assigned_client', blank=True, null=True, on_delete=models.SET_NULL)