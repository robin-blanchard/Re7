import json

from django.http import QueryDict

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination


from re7.recipes.models import Recipe, Product
from re7.recipes.serializers import RecipeSerializer, ProductSerializer


class RecipesListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all().order_by('-update_date')
    serializer_class = RecipeSerializer
    pagination_class = LimitOffsetPagination

    def create(self, request, *args, **kwargs):
        data = request.data

        if isinstance(data, QueryDict):
            data = data.dict()

        if isinstance(data["ingredients"], str):
            data["ingredients"] = json.loads(data["ingredients"])

        if isinstance(data["instructions"], str):
            data["instructions"] = json.loads(data["instructions"])

        if "photo" in data and isinstance(data["photo"], str):
            photo_url = data.pop("photo")
        else:
            photo_url = None

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save(photo_url=photo_url)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def update(self, request, *args, **kwargs):
        data = request.data

        if isinstance(data, QueryDict):
            data = data.dict()

        if isinstance(data["ingredients"], str):
            data["ingredients"] = json.loads(data["ingredients"])

        if isinstance(data["instructions"], str):
            data["instructions"] = json.loads(data["instructions"])

        if "photo" in data and isinstance(data["photo"], str):
            photo_url = data.pop("photo")
        else:
            photo_url = None

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer, photo_url=photo_url)

        return Response(serializer.data)

    def perform_update(self, serializer, photo_url):
        serializer.save(photo_url=photo_url)


class ProductsListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class UserRecipesView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Recipe.objects.filter(creater__username=username)
