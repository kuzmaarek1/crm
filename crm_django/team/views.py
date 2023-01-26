from .models import Team
from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.core.paginator import Paginator
from .serializers import TeamSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model

User = get_user_model()
page_number = 17

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    def get_queryset(self):
      return 

    def perform_create(self, serializer):
       object=serializer.save(created_by=self.request.user)
       object.members.add(self.request.user)
       object.save()

@api_view(['PUT'])
def delete_team(request, team_id):
    Team.objects.filter(id=team_id, created_by=request.user).delete()
    return Response({'message': 'Deleted'})

@api_view(['GET'])
def get_team(request):
    team = Team.objects.filter(members__in=[request.user]).order_by('-id').first()
    serializer = TeamSerializer(team)
    return Response(serializer.data)

@api_view(['GET'])
def get_teams(request):
    number = request.GET.get('page')
    team = Team.objects.filter(members__in=[request.user]).order_by('-id')
    paginator = Paginator(team, page_number)
    page_team = paginator.get_page(number)
    serializer = TeamSerializer(page_team, many=True)
    return Response({"results":serializer.data, "has_next":page_team.has_next(), "page":number})

@api_view(['GET'])
def search_team(request):
    number = request.GET.get('page')
    search = request.GET.get('search')
    team = Team.objects.filter(members__in=[request.user], name__icontains=search).order_by('-id')
    paginator = Paginator(team, page_number)
    page_team = paginator.get_page(number)
    serializer = TeamSerializer(page_team, many=True)
    return Response({"results":serializer.data, "has_next":page_team.has_next(), "page":number})

@api_view(['PATCH'])
def add_member(request, team_id):
    team = Team.objects.filter(id=team_id, members__in=[request.user]).first()

    username = request.data['username']
    if not User.objects.filter(username=username).exists():
        return HttpResponse(status=500)
    user = User.objects.get(username=username)
    team.save()
    user_dict = model_to_dict(user, fields=["id", "username", "first_name", "last_name"])
    if not team.members.filter(id=user_dict["id"]).exists():
        team.members.add(user)
        return Response(user_dict)
    else:
        return HttpResponse(status=500)

@api_view(['PUT'])
def update_team(request, team_id):
    team = Team.objects.filter(id=team_id).first()
    serializer = TeamSerializer(team, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Update'})