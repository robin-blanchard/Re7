import arrow

from django.contrib import admin

from re7.recipes.models import Recipe


class RecipeAdmin(admin.ModelAdmin):
    model = Recipe

    def get_difficulty(self, obj):
        return obj.get_difficulty_display()
    get_difficulty.short_description = "difficulty"

    def get_creation_date(self, obj):
        return arrow.get(obj.creation_date).humanize()
    get_creation_date.short_description = "creation date"

    def get_update_date(self, obj):
        return arrow.get(obj.update_date).humanize()
    get_update_date.short_description = "update_date"

    list_display = ("name", "get_creation_date",
                    "get_update_date", "get_difficulty", "total_time")


# Register your models here.
admin.site.register(Recipe, RecipeAdmin)
