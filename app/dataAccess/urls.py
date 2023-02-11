"""TMP URL for getting all DB entities displayed
"""
from rest_framework import routers
from . import api

router = routers.DefaultRouter()

router.register('api/dealType', api.DealTypeListView, 'show all')
router.register('api/objectType', api.ObjectTypeListView, 'show all')
router.register('api/objectKind', api.ObjectKindListView, 'show all')
router.register('api/address', api.ObjectAddressListView, 'show all')
router.register('api/region', api.AddressRegionListView, 'show all')
router.register('api/locality', api.AddressLocalityListView, 'show all')
router.register('api/street', api.AddressStreetListView, 'show all')
router.register('api/district', api.AddressDistrictListView, 'show all')
router.register('api/advts', api.AdsListView, 'show all')
router.register('api/typesKinds', api.ObjectTypesAndKindsListView, 'show all')
router.register('api/source', api.SourceListView, 'show all')


urlpatterns = router.urls
