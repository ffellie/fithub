from api.views import CourseDetail, CourseList, LectureList
from django.urls import path

urlpatterns = [
    path('courses/', CourseList.as_view()),
    path('courses/<int:pk>/', CourseDetail.as_view()),
    path('courses/<int:pk>/lectures/', LectureList.as_view())
]
