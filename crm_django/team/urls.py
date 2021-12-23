from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, delete_team, get_team, get_team_by_id

router = DefaultRouter()
router.register('teams', TeamViewSet, basename='teams')

urlpatterns = [
    path('teams/get_team/', get_team, name='get_team'),
    path('', include(router.urls)),
    path('teams/get_team/<int:team_id>/', get_team_by_id, name='get_team_by_id'),
    path('teams/delete_team/<int:team_id>/', delete_team, name='delete_team')
]