from django.db import models
from team.models import Team
from django.contrib.auth import get_user_model

User = get_user_model()

class Client(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.IntegerField()
    email = models.EmailField()
    description = models.CharField(max_length=10000)
    created_by = models.ForeignKey(User, related_name='create_client', on_delete=models.CASCADE)
    team = models.ForeignKey(Team, related_name='team_client', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, related_name='assigned_client', blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return str(self.id)