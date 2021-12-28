from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, delete_client, get_client, create_client, get_client_by_id, update_client, search_client, convert_lead_to_client

router = DefaultRouter()
router.register('clients', ClientViewSet, basename='clients')

urlpatterns = [
    path('', include(router.urls)),
    path('clients/get_client/<int:team_id>/', get_client, name='get_client'),
    path('clients/search_client/<int:team_id>/<str:search>/', search_client, name='search_client'),
    path('clients/get_client_by_id/<int:client_id>/<int:team_id>/', get_client_by_id, name='get_client_by_id'),
    path('clients/update_client/<int:client_id>/<int:team_id>/', update_client, name='update_client'),
    path('clients/create_client/<int:team_id>/', create_client, name='create_client'),
    path('clients/delete_client/<int:client_id>/<int:team_id>/', delete_client, name='delete_client'),
    path('convert_lead_to_client/<int:lead_id>/<int:team_id>/', convert_lead_to_client, name='convert_lead_to_client')
]