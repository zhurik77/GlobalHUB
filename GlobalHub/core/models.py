from django.db import models
from django.core.exceptions import MultipleObjectsReturned
from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend, UserModel
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patronymic = models.CharField(max_length=15)
    phone_number = models.CharField(max_length=20)
    birth_date = models.DateField(null=True, blank=True)
    private_key = models.CharField(max_length=64)
    university = models.CharField(max_length=64)
    grade = models.IntegerField()
    direction = models.CharField(max_length=64)
    interests = models.CharField(max_length=64)
    skills = models.CharField(max_length=64)
    languages = models.CharField(max_length=64)
    about_me = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.user.last_name} {self.user.first_name} {self.patronymic}"




