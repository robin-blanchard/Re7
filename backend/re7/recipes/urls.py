from django.urls import path

from .views import RecipesListView, ProductsListView

urlpatterns = [path("recipes", RecipesListView.as_view()),
               path("products", ProductsListView.as_view())]
