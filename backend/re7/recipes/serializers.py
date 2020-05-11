from rest_framework import serializers
from re7.recipes.models import Recipe, Product, Ingredient, Instruction
from re7.authentication.serializers import CustomUserSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "name"]
        model = Product


class IngredientSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        fields = ["quantity", "unit", "product"]
        model = Ingredient


class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["order", "text"]
        model = Instruction


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=False)
    instructions = InstructionSerializer(many=True, read_only=False)
    creater = CustomUserSerializer(read_only=True)

    class Meta:
        fields = "__all__"
        model = Recipe

    def create(self, validated_data):
        ingredients_set_data = validated_data.pop("ingredients")
        instructions_set_data = validated_data.pop("instructions")

        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_set_data:
            product_data = ingredient_data.pop("product")
            product, _ = Product.objects.get_or_create(**product_data)

            Ingredient.objects.create(
                recipe=recipe, product=product, **ingredient_data)

        for instruction_data in instructions_set_data:
            Instruction.objects.create(recipe=recipe, **instruction_data)

        return recipe
