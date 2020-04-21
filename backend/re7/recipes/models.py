import uuid
from django.db import models

# Create your models here.


class Recipe(models.Model):
    DIFFICULTY_LEVELS = [(1, "Simple"),
                         (2, "Modéré"),
                         (3, "Difficile")]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creation_date = models.DateField(auto_now_add=True, editable=False)
    update_date = models.DateField(auto_now=True, editable=False)

    name = models.CharField(max_length=50)
    difficulty = models.IntegerField(choices=DIFFICULTY_LEVELS)
    prep_time = models.PositiveSmallIntegerField()
    bake_time = models.PositiveSmallIntegerField()
    total_time = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name
