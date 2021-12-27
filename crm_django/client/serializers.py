from .models import Client
from rest_framework import serializers
from team.serializers import UserSerializer

class ClientSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    class Meta:
        model=Client
        read_only_fields = (
            'created_by',
        )
        fields=(
            'id',
            'first_name',
            'last_name',
            'phone',
            'email',
            'description',
            'created_by',
            'assigned_to'
        )