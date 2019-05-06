from api.models import Course, Lecture, Lesson, User
from rest_framework import serializers



class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField
    description = serializers.CharField

    class Meta:
        model = Course
        fields = ('id', 'name', 'description')


class LectureSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField()
    date_added = serializers.DateTimeField()
    course = CourseSerializer()

    class Meta:
        model = Lecture
        fields = ('id', 'title', 'description', 'date_added', 'course')

class LessonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    info = serializers.CharField()
    room = serializers.IntegerField()
    day = serializers.CharField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    course = CourseSerializer()

    class Meta:
        model = Lesson
        fields = ('id','title','info','room','day','start_time','end_time', 'course')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)