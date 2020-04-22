from rest_framework import generics
from re7.recipes.models import Recipe
from re7.recipes.serializers import RecipeSerializer


class RecipesListView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
