from api.models import Course, Lecture
from rest_framework import serializers


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField
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
