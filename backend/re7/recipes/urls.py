from django.urls import path

from .views import RecipesListView, RecipeDetailView, ProductsListView, UserRecipesView, SearchRecipesView

urlpatterns = [path("recipes", RecipesListView.as_view()),
               path("recipes/<pk>", RecipeDetailView.as_view()),
               path("products", ProductsListView.as_view()),
               path("user/<username>", UserRecipesView.as_view()),
               path("search/recipes", SearchRecipesView.as_view())]
