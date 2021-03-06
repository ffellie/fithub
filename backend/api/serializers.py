from api.models import Course, Lecture, Lesson, User, News, Students, Rooms
from rest_framework import serializers


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)

    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'subjects')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',)



class RoomsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    number = serializers.IntegerField(required=True)
    isadministrative = serializers.BooleanField(required=True)
    postfix = serializers.CharField(required=False)

    class Meta:
        model = Rooms
        fields = ('id', 'number', 'isadministrative', 'postfix')

class LectureSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField()
    date_added = serializers.DateTimeField()

    class Meta:
        model = Lecture
        fields = ('id', 'number', 'isadministrative', 'postfix')


class StudentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    fname = serializers.CharField(required=True)
    sname = serializers.CharField(required=True)

    class Meta:
        model = Students
        fields = ('id', 'fname', 'sname')

class LessonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    info = serializers.CharField()
    room = serializers.IntegerField()
    day = serializers.CharField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()

    class Meta:
        model = Lesson
        fields = ('id', 'title', 'info', 'room', 'day', 'start_time', 'end_time')



class ForumSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField()
    date_added = serializers.DateTimeField()
    course = CourseSerializer()

    class Meta:
        model = Lecture
        fields = ('id', 'title', 'description', 'date_added', 'course')


class TopicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField()
    date_added = serializers.DateTimeField()
    forum = ForumSerializer()

    class Meta:
        model = Lecture
        fields = ('id', 'title', 'description', 'date_added', 'forum')


class EventSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField()
    date_added = serializers.DateTimeField()
    course = CourseSerializer()

    class Meta:
        model = Lecture
        fields = ('id', 'name', 'description', 'date_added', 'course')


class NewsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    text = serializers.CharField()
    created_at = serializers.DateTimeField()

    class Meta:
        model = News
        fields = ('id', 'title', 'text', 'created_at', )

