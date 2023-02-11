from django.contrib import admin

from .models import Advt, Deal_type, Object_type, Object_kind, Address_region, Address_locality, Address_street, Address_district, Object_address, Object_types_and_kinds, Source

admin.site.register(Advt)
admin.site.register(Deal_type)
admin.site.register(Object_type)
admin.site.register(Object_kind)
admin.site.register(Address_region)
admin.site.register(Address_locality)
admin.site.register(Address_street)
admin.site.register(Address_district)
admin.site.register(Object_address)
admin.site.register(Object_types_and_kinds)
admin.site.register(Source)
