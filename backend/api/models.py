from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.


class CourseManager(models.Manager):
    def for_user(self, user):
        return self.filter(author=user)


class Students(models.Model):
    fname = models.CharField(max_length=100)
    sname = models.CharField(max_length=100)

class Teacher(models.Model):
    fname = models.CharField(max_length=100)
    sname = models.CharField(max_length=100)

class Course(models.Model):
    name = models.CharField(max_length=200, default='')
    description = models.CharField(max_length=1000, default='')
    subjects = models.ForeignKey(Students, on_delete=models.CASCADE, default=1, related_name='subjects1')

class Course2(models.Model):
    name = models.CharField(max_length=200, default='')
    description = models.CharField(max_length=1000, default='')
    subjects = models.ForeignKey(Teacher, on_delete=models.CASCADE, default=1, related_name='subjects2')

class Lecture(models.Model):
    title = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=1000, default='')
    date_added = models.DateTimeField(default=datetime.now())
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default='', related_name='lectures')


class Lesson(models.Model):
    title = models.CharField(max_length=50)
    info = models.CharField(max_length=50)
    room = models.IntegerField()
    day = models.CharField(max_length=20)
    start_time = models.TimeField()
    end_time = models.TimeField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    lessons = models.ForeignKey(Students,  on_delete=models.CASCADE, default=1, related_name='lessons1')


class Lesson2(models.Model):
    title = models.CharField(max_length=50)
    info = models.CharField(max_length=50)
    room = models.IntegerField()
    day = models.CharField(max_length=20)
    start_time = models.TimeField()
    end_time = models.TimeField()
    course = models.ForeignKey(Course2, on_delete=models.CASCADE, related_name='lessons2')
    lessons = models.ForeignKey(Teacher,  on_delete=models.CASCADE, default=1, related_name='lessons22')


class Forum(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    date_added = models.DateTimeField(default=datetime.now())
    course = models.ForeignKey(Course, on_delete=models.CASCADE)


class Topic(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    date_added = models.DateTimeField(default=datetime.now())
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)


class Event(models.Model):
    name = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=1000, default='')
    date_added = models.DateTimeField(default=datetime.now())
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default='')


class News(models.Model):
    title = models.CharField(max_length=100)
    text = models.CharField(max_length=2000)
    created_at = models.DateTimeField()

class Rooms(models.Model):
    number = models.IntegerField()
    isadministrative = models.BooleanField()
    postfix = models.CharField(max_length=200)

class Rooms1(models.Model):
    number = models.IntegerField()
    isadministrative = models.BooleanField()
    postfix = models.CharField(max_length=200)
    isoccupied = models.BooleanField()

