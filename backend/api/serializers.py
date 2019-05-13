from api.models import Course, Lecture, Lesson, User, News
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

    class Meta:
        model = Lecture
        fields = ('id', 'title', 'description', 'date_added')


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


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

