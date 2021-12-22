from .models import Team
from .serializers import TeamSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    def get_queryset(self):
       return self.queryset.filter(created_by=self.request.user)

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
    team = Team.objects.filter(created_by=request.user).first()
    serializer = TeamSerializer(team)
    return Response(serializer.data)