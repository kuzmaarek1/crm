from .models import Team
from .serializers import TeamSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    def get_queryset(self):
       return self.queryset.filter(members__in=[self.request.user])

    def perform_create(self, serializer):
       object=serializer.save(created_by=self.request.user)
       object.members.add(self.request.user)
       object.save()

@api_view(['POST'])
def delete_team(request, team_id):
    Team.objects.filter(id=team_id, created_by=request.user).delete()
    return Response({'message': 'Deleted'})

@api_view(['GET'])
def get_team(request):
    team = Team.objects.filter(members__in=[request.user]).first()
    serializer = TeamSerializer(team)
    return Response(serializer.data)

@api_view(['GET'])
def search_team(request, search):
    team = Team.objects.filter(members__in=[request.user], name__icontains=search)
    serializer = TeamSerializer(team, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_team_by_id(request, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()
    serializer = TeamSerializer(team)
    return Response(serializer.data)

@api_view(['POST'])
def add_member(request, team_id):
    team = Team.objects.filter(members__in=[request.user], id=team_id).first()

    username = request.data['username']
    user = User.objects.get(username=username)
    team.members.add(user)

    team.save()
    return Response()