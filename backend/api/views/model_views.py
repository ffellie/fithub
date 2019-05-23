from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Course, Lecture
from api.serializers import CourseSerializer, LectureSerializer, LessonSerializer, ForumSerializer, TopicSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class CourseList(APIView):

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CourseDetail2(APIView):
    permission_classes = (IsAdminUser,)
    lookup_field = "pk"

    def get_object(self, pk):
        try:
            return Course.objects.get(id=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        course = self.get_object(pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        course = self.get_object(pk)
        serializer = CourseSerializer(instance=course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LectureList(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request, pk):
        course = Course.objects.get(id=pk)
        lectures = course.lectures.all()
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)

    def post(self, request,pk):
        course = Course.objects.get(id=pk)
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(course=course)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LessonList(APIView):
    permission_classes = (IsAdminUser,)

    def get(self,request,pk):
        course = Course.objects.get(id=pk)
        lessons = course.lessons.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        serializer = LessonSerializer(data=request.data)
        course = Course.objects.get(id=pk)
        if serializer.is_valid():
            serializer.save(course=course)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ForumList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        course = Course.objects.get(id=pk)
        forums = course.lectures.all()
        serializer = ForumSerializer(forums, many=True)
        return Response(serializer.data)

    def post(self, request,pk):
        course = Course.objects.get(id=pk)
        serializer = ForumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(course=course)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TopicList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, pk1):
        course = Course.objects.get(id=pk)
        forum = course.lectures.get(id=pk1)
        topics = forum.topic_set.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

    def post(self, request,pk, pk1):
        course = Course.objects.get(id=pk)
        forum = course.lectures.get(id=pk1)
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(forum=forum)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


