from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    created_by = models.ForeignKey(User, related_name='create_team', on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='team_members')

    def __str__(self):
        return self.name