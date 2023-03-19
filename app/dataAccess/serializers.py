from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from . import models


class AdsListSerializer(serializers.ModelSerializer):
    # object_address = serializers.StringRelatedField()

    class Meta:
        model = models.Advt
        fields = '__all__' # ('id', 'price', 'object_address', 'square', 'unit_price', 'short_description')


class SingleAdvtSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Advt
        fields = '__all__'
        depth = 2


class DealTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Deal_type
        fields = '__all__'


class ObjectTypesAndKindsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Object_types_and_kinds
        fields = '__all__'
        depth = 1


class ObjectKindSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Object_kind
        fields = '__all__'


class ObjectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Object_type
        fields = '__all__'


class ObjectAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Object_address
        fields = '__all__' #('id', 'address_region')


class AddressRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address_region
        fields = '__all__'


class AddressLocalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address_locality
        fields = '__all__'


class AddressDistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address_district
        fields = '__all__'


class AddressStreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address_street
        fields = '__all__'


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Source
        fields = '__all__'
