from rest_framework import serializers
from re7.recipes.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "update_date", "name", "difficulty",
                  "prep_time", "bake_time", "total_time"]
        model = Recipe
