import uuid
from django.db import models

from re7.authentication.models import CustomUser, deleted_user

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
    creater = models.ForeignKey(
        CustomUser, on_delete=models.SET_DEFAULT, default=deleted_user, related_name="recipes", to_field="username")

    name = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS)
    prep_time = models.PositiveSmallIntegerField()
    bake_time = models.PositiveSmallIntegerField()
    total_time = models.PositiveSmallIntegerField()
    nb_covers = models.PositiveSmallIntegerField(null=True)

    photo = models.ImageField(
        upload_to="photos", default="recipe-default-image.jpg")

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    quantity = models.PositiveSmallIntegerField()
    unit = models.CharField(max_length=25, blank=True)

    recipe = models.ForeignKey(
        Recipe, related_name="ingredients", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.quantity} {self.unit} de {self.product.name}"


class Instruction(models.Model):
    text = models.CharField(max_length=200)
    order = models.PositiveSmallIntegerField()

    recipe = models.ForeignKey(
        Recipe, related_name="instructions", on_delete=models.CASCADE)

    def __str__(self):
        return self.text
