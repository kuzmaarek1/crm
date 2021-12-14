from .models import Lead
from rest_framework import serializers

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model=Lead
        fields=(
            'id',
            'first_name',
            'last_name',
            'phone',
            'email'
        )