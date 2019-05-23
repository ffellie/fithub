from django_filters import rest_framework as filters
from api.models import Rooms1


class RoomFilter(filters.FilterSet):
    # name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Rooms1
        fields = ('number', 'isadministrative' ,'isoccupied',)
\