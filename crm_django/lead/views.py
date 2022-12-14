from django.contrib.auth.models import User
from operator import itemgetter
from django.db.models import Q
from rest_framework import viewsets
from .serializers import LeadSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Lead
from team.models import Team

class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def get_queryset(self):
       team = Team.objects.filter(members__in=[self.request.user]).first()
       return self.queryset.filter(team=team)

    def perform_create(self, serializer):
        team = Team.objects.filter(members__in=[self.request.user]).first()
        serializer.save(created_by=self.request.user,team=team)

@api_view(['GET'])
def get_lead(request,team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    lead=Lead.objects.filter(team=team)
    serializer = LeadSerializer(lead, many=True)
    data = serializer.data
    return Response(data)

@api_view(['GET'])
def search_lead(request,team_id,search):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    lead=Lead.objects.filter(Q(first_name__icontains=search, team=team) | Q(last_name__icontains=search, team=team))
    serializer = LeadSerializer(lead, many=True)
    data = serializer.data
    return Response(data)

@api_view(['POST'])
def create_lead(request,team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    first_name, last_name, email, phone, description = itemgetter("first_name", "last_name", "email", "phone", "description")(request.data)
    serializer = LeadSerializer(data={'first_name':first_name, 'last_name':last_name, 'email':email, 'phone':phone, 'description':description})
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
def update_lead(request, lead_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    lead = Lead.objects.get(id=lead_id)
    serializer = LeadSerializer(lead, data=request.data)
    try:
        username = request.data['assigned_to']
        user = User.objects.get(username=username)
        serializer.save(team=team, assigned_to=user)
    except:
        serializer.save(team=team)
    return Response({'message':'Update'})

@api_view(['PUT'])
def delete_lead(request,lead_id, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    Lead.objects.filter(id=lead_id, team=team).delete()
    return Response({'message':'Deleted'})