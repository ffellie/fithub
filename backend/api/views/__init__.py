from api.views.model_views import CourseDetail, CourseList, LectureList,LessonList, ForumList, TopicList
from api.views.auth import logout, login
from .generic_cbv import NewsList, StudentsList, CoursesList, Courses2List, CourseDetail, RoomsList, RoomsList2
from .fbv import lectures_list, lessons_list, courses_list
from .auth import UserViewSet