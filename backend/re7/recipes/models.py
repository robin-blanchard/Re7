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
    creation_date = models.DateField(auto_now_add=True, editable=False)
    update_date = models.DateField(auto_now=True, editable=False)

    name = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS)
    prep_time = models.PositiveSmallIntegerField()
    bake_time = models.PositiveSmallIntegerField()
    total_time = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name
