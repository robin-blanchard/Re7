from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class CustomUser(AbstractUser):
    age = models.PositiveSmallIntegerField(null=True)


def deleted_user():
    return CustomUser.objects.get(username="deleted_user").pk
