from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 're_password']


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ['id' ,'username', 'first_name', 'last_name']
