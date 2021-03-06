from django.contrib.auth.models import User
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from .serializers import ClientSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Client
from lead.models import Lead
from team.models import Team

class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    def get_queryset(self):
       team = Team.objects.filter(members__in=[self.request.user]).first()
       return self.queryset.filter(team=team)

    def perform_create(self, serializer):
        team = Team.objects.filter(members__in=[self.request.user]).first()
        serializer.save(created_by=self.request.user,team=team)

@api_view(['GET'])
def get_client(request,team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    client=Client.objects.filter(team=team)
    serializer = ClientSerializer(client, many=True)
    data = serializer.data
    return Response(data)

@api_view(['GET'])
def search_client(request,team_id,search):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    client=Client.objects.filter(Q(first_name__icontains=search, team=team) | Q(last_name__icontains=search, team=team))
    serializer = ClientSerializer(client, many=True)
    data = serializer.data
    return Response(data)

@api_view(['GET'])
def get_client_by_id(request,client_id,team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    client=Client.objects.filter(team=team,id=client_id)
    serializer = ClientSerializer(client, many=True)
    data = serializer.data
    return Response(data)

@api_view(['POST'])
def create_client(request,team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    serializer = ClientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user, team=team)
    return Response({'message':'Create'})

@api_view(['POST'])
def update_client(request, client_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    client = Client.objects.get(id=client_id)
    serializer = ClientSerializer(client, data=request.data)
    username = request.data['assigned_to']
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        user = 0
    if serializer.is_valid():
        if user:
            serializer.save(team=team, assigned_to=user)
        else:
            serializer.save(team=team)
    return Response({'message':'Update'})

@api_view(['POST'])
def delete_client(request,client_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    Client.objects.filter(id=client_id, team=team).delete()
    return Response({'message':'Deleted'})

@api_view(['POST'])
def convert_lead_to_client(request, lead_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    lead = Lead.objects.filter(team=team).get(id=lead_id)
    client = Client.objects.create(team=team, first_name=lead.first_name, last_name=lead.last_name, phone=lead.phone,
                                   email=lead.email,  created_by=request.user)
    Lead.objects.filter(team=team, id=lead_id).delete()
    return Response({'message': 'Convert'})