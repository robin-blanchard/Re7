from django.contrib import admin
from re7.authentication.models import CustomUser

# Register your models here.


class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser


admin.site.register(CustomUser, CustomUserAdmin)
