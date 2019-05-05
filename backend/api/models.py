from django.db import models
from datetime import datetime


# Create your models here.


class Course(models.Model):
    name = models.CharField(max_length=200, default='')
    description = models.CharField(max_length=1000, default='')


class Lecture(models.Model):
    title = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=1000, default='')
    date_added = models.DateTimeField(default=datetime.now())
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default='')


class Event(models.Model):
    title = models.CharField(max_length=200, default='')


