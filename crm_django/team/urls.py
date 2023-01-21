from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, delete_team, get_team, add_member, search_team, update_team

router = DefaultRouter()
router.register('teams', TeamViewSet, basename='teams')

urlpatterns = [
    path('teams/get_team/', get_team, name='get_team'),
    path('teams/search_team/', search_team, name='search_team'),
    path('', include(router.urls)),
    path('teams/add_member/<int:team_id>/', add_member, name='add_member'),
    path('teams/delete_team/<int:team_id>/', delete_team, name='delete_team'),
    path('teams/update_team/<int:team_id>/', update_team, name='update_team')
]