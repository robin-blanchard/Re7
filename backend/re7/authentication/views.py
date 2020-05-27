from rest_framework import generics, permissions, filters
from rest_framework.pagination import LimitOffsetPagination

from re7.authentication.models import CustomUser
from re7.authentication.serializers import CustomUserSerializer


# Create your views here.


class CustomUserCreate(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class CustomUsersList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)

    serializer_class = CustomUserSerializer
    search_fields = ["username"]
    filter_backends = (filters.SearchFilter,)
    queryset = CustomUser.objects.all().order_by("username")
    pagination_class = LimitOffsetPagination
