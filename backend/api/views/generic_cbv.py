
from django.http import Http404
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from api.serializers import StudentSerializer, CourseSerializer, RoomsSerializer
from api.models import Students, Course2, Course, Rooms
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

from api.models import News
from api.serializers import NewsSerializer


class NewsList(generics.ListCreateAPIView):
    serializer_class = NewsSerializer

    def get_queryset(self):
        return News.objects.all()

    filter_backends = (filters.OrderingFilter,)

    ordering_fields = ('created_at',)
    ordering = ('-created_at',)

    def perform_create(self, serializer):
        serializer.save(created_by=datetime.now)


class StudentsList(generics.ListCreateAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return Students.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CoursesList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        try:
            category = Students.objects.get(id=self.kwargs.get('pk'))
        except Students.DoesNotExist:
            raise Http404
        queryset = category.subjects1.all()
        return queryset


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
        serializer_class = CourseSerializer
        lookup_url_kwarg = "pk2"

        def get_queryset(self):
            try:
                category = Students.objects.get(id=self.kwargs.get('pk'))
            except Students.DoesNotExist:
                raise Http404
            queryset = category.subjects1.filter(id=self.kwargs.get('pk2'))
            print(self.kwargs.get('pk2'))
            print(queryset)
            return queryset

        # def get_queryset(self, *args, **kwargs):
        #     return Task.objects.filter(id=self.kwargs['pk2'])

class Courses2List(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Course2.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save()


class RoomsList(generics.ListCreateAPIView):
    serializer_class = RoomsSerializer

    def get_queryset(self):
        queryset = Rooms.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save()


class RoomsList2(generics.ListCreateAPIView):
    serializer_class = RoomsSerializer
    pagination_class = LimitOffsetPagination



    def get_queryset(self):
        return Rooms.objects.all()

    def perform_create(self, serializer):
        serializer.save()