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
    ingredients = IngredientSerializer(many=True, read_only=False)

    class Meta:
        fields = ["id", "update_date", "name", "difficulty",
                  "prep_time", "bake_time", "total_time", "ingredients"]
        model = Recipe

    def create(self, validated_data):
        ingredients_set_data = validated_data.pop("ingredients")
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_set_data:
            product_data = ingredient_data.pop("product")
            product, _ = Product.objects.get_or_create(**product_data)

            Ingredient.objects.create(
                recipe=recipe, product=product, **ingredient_data)
        return recipe
