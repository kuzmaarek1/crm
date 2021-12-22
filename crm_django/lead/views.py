from rest_framework import viewsets
from .serializers import LeadSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Lead

class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def get_queryset(self):
       return self.queryset.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

@api_view(['POST'])
def delete_lead(request,lead_id):
    Lead.objects.filter(id=lead_id, created_by=request.user).delete()
    return Response({'message':'Deleted'})