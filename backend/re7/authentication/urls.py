from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from re7.authentication.views import CustomUserCreate, CustomUsersList

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('users', CustomUsersList.as_view(), name="users_list"),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
