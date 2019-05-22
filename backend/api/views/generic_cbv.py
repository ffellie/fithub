
from django.http import Http404
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from api.serializers import StudentSerializer, CourseSerializer
from api.models import Students
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
    pagination_class = LimitOffsetPagination
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter,
                       filters.OrderingFilter)


    def get_queryset(self):
        try:
            category = Students.objects.get(id=self.kwargs.get('pk'))
        except Students.DoesNotExist:
            raise Http404
        queryset = category.subjects1.all()
        return queryset