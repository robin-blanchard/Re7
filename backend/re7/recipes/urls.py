from django.urls import path

from .views import RecipesListView, RecipeDetailView, ProductsListView

urlpatterns = [path("recipes", RecipesListView.as_view()),
               path("recipes/<pk>", RecipeDetailView.as_view()),
               path("products", ProductsListView.as_view())]
