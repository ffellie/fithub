from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from api.models import Course, Lecture, Lesson
from api.serializers import LectureSerializer, LessonSerializer, CourseSerializer


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def courses_list(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def lectures_list(request, pk):
    course = Course.objects.get(id=pk)
    lectures = course.lectures.all()
    serializer = CourseSerializer(lectures, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def lessons_list(request, pk):
    course = Course.objects.get(id=pk)
    lessons = course.lessons.all()
    serializer = CourseSerializer(lessons, many=True)
    return Response(serializer.data)

