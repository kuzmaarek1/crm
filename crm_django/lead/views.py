from rest_framework import viewsets #, decorators, response
from .serializers import LeadSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Lead

class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def get_queryset(self):
       return self.queryset.filter()

@api_view(['POST'])
def delete_lead(request,lead_id):
    Lead.objects.filter(id=lead_id).delete()
    return Response({'message':'Deleted'})