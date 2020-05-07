from rest_framework import generics, permissions

from re7.authentication.models import CustomUser
from re7.authentication.serializers import CustomUserSerializer

# Create your views here.


class CustomUserCreate(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
