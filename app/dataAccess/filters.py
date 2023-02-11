from django_filters import rest_framework as filters
from .models import Advt


class AdvtFilter(filters.FilterSet):
    class Meta:
        model = Advt
        fields = {
            'placement_date': ['lte', 'gte', ],
            'unit_price': ['lte', 'gte', ],
            'price': ['lte', 'gte', ],
            'square': ['lte', 'gte', ],
            'source_id': ['exact'],
            'source_link': ['in'],
            'object_address__address_region': ['in'],
            'object_address__address_locality': ['in'],
            'object_address__address_district': ['exact'],
            'object_address__address_street': ['exact'],
            'object_address__raw_string': ['icontains'],
            'full_description': ['icontains'],
            'deal_type': ['in'],
            'object_types_and_kinds': ['in']
        }
