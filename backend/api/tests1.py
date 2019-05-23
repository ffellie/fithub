from django.test import TestCase
from api.models import Course2, Students, Course, Rooms1

class URLTests(TestCase):
    def test_homepage(self):
        response = self.client.get('/api/courses/')
        self.assertEqual(response.status_code, 200)

class URLTests1(TestCase):
    def test_homepage(self):
        response = self.client.delete('/api/courses/1/')
        self.assertEqual(response.status_code, 401)

class Rooms1Test(TestCase):



    def testrooms1(self):
        Rooms1.objects.create(number=100, isadministrative=True, postfix="a", isoccupied=True)
        Rooms1.objects.create(number=101, isadministrative=False, postfix="a", isoccupied=True)
        Rooms1.objects.create(number=102, isadministrative=True, postfix="a", isoccupied=False)
        Rooms1.objects.create(number=103, isadministrative=False, postfix="a", isoccupied=False)
        Rooms1.objects.create(number=104, isadministrative=False, postfix="a", isoccupied=True)

        rooms = Rooms1.objects.get(isoccupied=True, isadministrative=True)
        rooms2 = Rooms1.objects.all()
        room3 = rooms2.get(isoccupied=True)
        room4 = room3.get(isadministrative=True)
        self.assertEqual(room4, rooms)