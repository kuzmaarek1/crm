from rest_framework import viewsets
from .serializers import LeadSerializer
from .models import Lead

class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def get_queryset(self):
        return self.queryset.filter()

    def create_lead(self, serializer):
        serializer.save()