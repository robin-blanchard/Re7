from rest_framework import serializers
from re7.recipes.models import Recipe, Product, Ingredient


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "name"]
        model = Product


class IngredientSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        fields = ["quantity", "unit", "product"]
        model = Ingredient


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta:
        fields = ["id", "update_date", "name", "difficulty",
                  "prep_time", "bake_time", "total_time", "ingredients"]
        model = Recipe
