import json

from django.http import QueryDict

from rest_framework import generics, status
from rest_framework.response import Response

from re7.recipes.models import Recipe, Product
from re7.recipes.serializers import RecipeSerializer, ProductSerializer


class RecipesListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def post(self, request, *args, **kwargs):
        data = request.data

        if isinstance(data, QueryDict):
            data = data.dict()

        if isinstance(data["ingredients"], str):
            data["ingredients"] = json.loads(data["ingredients"])

        if isinstance(data["instructions"], str):
            data["instructions"] = json.loads(data["instructions"])

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetailView(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class ProductsListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
