from api.views.model_views import  CourseList, LectureList,LessonList, ForumList, TopicList
from api.views.model_views import CourseDetail2
from api.views.auth import logout, login
from .generic_cbv import NewsList, StudentsList, CoursesList, Courses2List, CourseDetail,\
    RoomsList, RoomsList2, RoomsList22, RoomsList222, RoomDetail, LessonList,\
    LessonDetail, LessonList2, LessonDetailCourse
from .fbv import lectures_list, lessons_list, courses_list
from .auth import UserViewSet