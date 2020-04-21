from django.contrib import admin
from re7.recipes.models import Recipe

# Register your models here.
admin.site.register(Recipe, admin.ModelAdmin)
