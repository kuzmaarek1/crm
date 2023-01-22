from django.contrib.auth import get_user_model
from django.db.models import Q
from operator import itemgetter
from rest_framework import viewsets
from django.core.paginator import Paginator
from .serializers import ClientSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Client
from lead.models import Lead
from team.models import Team

User = get_user_model()
page_number = 2 

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
    number = request.GET.get('page')
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    client=Client.objects.filter(team=team).order_by('-id')

    paginator = Paginator(client, page_number)
    page_client = paginator.get_page(number)
    serializer = ClientSerializer(page_client, many=True)
    return  Response({"results":serializer.data, "has_next":page_client.has_next(), "page":number})

@api_view(['GET'])
def search_client(request,team_id):
    number = request.GET.get('page')
    search = request.GET.get('search')
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    for idx, key in enumerate(search.split()):
        if idx == 0:
            client = Client.objects.filter(Q(first_name__icontains=key, team=team) | Q(last_name__icontains=key, team=team)).order_by('-id')
        else:
            client = client.filter(Q(first_name__icontains=key, team=team) | Q(last_name__icontains=key, team=team)).order_by('-id')
    paginator = Paginator(client, page_number)
    page_client = paginator.get_page(number)
    serializer = ClientSerializer(page_client, many=True)
    return Response({"results":serializer.data, "has_next":page_client.has_next(), "page":number})

@api_view(['POST'])
def create_client(request,team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    first_name, last_name, email, phone, description = itemgetter("first_name", "last_name", "email", "phone", "description")(request.data)
    serializer =  ClientSerializer(data={'first_name':first_name, 'last_name':last_name, 'email':email, 'phone':phone, 'description':description})
    if serializer.is_valid():
        assigned_to = itemgetter("assigned_to")(request.data)
        try:
            user = User.objects.get(username=assigned_to)
            serializer.save(created_by=request.user, team=team, assigned_to=user)
            return Response({'message':'Create'})
        except User.DoesNotExist:
            if  assigned_to =="":
                serializer.save(created_by=request.user, team=team)
                return Response({'message':'Create'})

@api_view(['PUT'])
def update_client(request, client_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    first_name, last_name, email, phone, description = itemgetter("first_name", "last_name", "email", "phone", "description")(request.data)
    client = Client.objects.get(id=client_id)
    serializer = ClientSerializer(client, data={'first_name':first_name, 'last_name':last_name, 'email':email, 'phone':phone, 'description':description})
    if serializer.is_valid():
        assigned_to = itemgetter("assigned_to")(request.data)
        try:
            user = User.objects.get(username=assigned_to)
            serializer.save(team=team, assigned_to=user)
            return Response({'message':'Update'})
        except User.DoesNotExist:
            if  assigned_to =="":
                serializer.save(team=team, assigned_to=None)
                return Response({'message':'Update'})

@api_view(['PUT'])
def delete_client(request,client_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    Client.objects.filter(id=client_id, team=team).delete()
    return Response({'message':'Deleted'})

@api_view(['POST'])
def convert_lead_to_client(request, lead_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    lead = Lead.objects.filter(team=team).get(id=lead_id)
    client = Client.objects.create(team=team, first_name=lead.first_name, last_name=lead.last_name, phone=lead.phone,
                                   email=lead.email, created_by=request.user, description=lead.description, assigned_to=lead.assigned_to)
    Lead.objects.filter(team=team, id=lead_id).delete()
    return Response({'message':'Convert'})