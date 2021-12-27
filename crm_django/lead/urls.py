from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeadViewSet, delete_lead, get_lead, create_lead, get_lead_by_id, update_lead, search_lead

router = DefaultRouter()
router.register('leads', LeadViewSet, basename='leads')

urlpatterns = [
    path('', include(router.urls)),
    path('leads/get_lead/<int:team_id>/', get_lead, name='get_lead'),
    path('leads/search_lead/<int:team_id>/<str:search>/', search_lead, name='search_lead'),
    path('leads/get_lead_by_id/<int:lead_id>/<int:team_id>/', get_lead_by_id, name='get_lead_by_id'),
    path('leads/update_lead/<int:lead_id>/<int:team_id>/', update_lead, name='update_lead'),
    path('leads/create_lead/<int:team_id>/', create_lead, name='create_lead'),
    path('leads/delete_lead/<int:lead_id>/<int:team_id>/', delete_lead, name='delete_lead')
]