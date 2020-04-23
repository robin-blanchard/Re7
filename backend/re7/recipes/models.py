import uuid
from django.db import models

# Create your models here.


class Recipe(models.Model):
    EASY = '1'
    MEDIUM = '2'
    HARD = '3'
    DIFFICULTY_LEVELS = ((EASY, "Simple"),
                         (MEDIUM, "Modéré"),
                         (HARD, "Difficile"))

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creation_date = models.DateTimeField(auto_now_add=True, editable=False)
    update_date = models.DateTimeField(auto_now=True, editable=False)

    name = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS)
    prep_time = models.PositiveSmallIntegerField()
    bake_time = models.PositiveSmallIntegerField()
    total_time = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    G = "g"
    KG = "kg"
    L = "L"
    cL = "cL"
    UNIT_MEASURES = ((G, "g"),
                     (KG, "kg"),
                     (L, "L"),
                     (cL, "cL"))
    quantity = models.PositiveSmallIntegerField()
    unit = models.CharField(max_length=5, choices=UNIT_MEASURES)

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.quantity} {self.unit} de {self.product.name}"
