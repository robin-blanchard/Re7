from django.contrib import admin
from re7.recipes.models import Recipe


class RecipeAdmin(admin.ModelAdmin):
    model = Recipe

    def get_difficulty(self, obj):
        return obj.get_difficulty_display()
    get_difficulty.short_description = "difficulty"

    list_display = ("name", "get_difficulty", "prep_time")


# Register your models here.
admin.site.register(Recipe, RecipeAdmin)
