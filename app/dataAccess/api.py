from rest_framework import viewsets, permissions
from django.core.exceptions import ValidationError

from . import serializers
from . import models
from .pagination import ResultSetPagination
from .filters import AdvtFilter
from django_filters import rest_framework as filters
from rest_condition import Or


class IsReadyOnlyRequest(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.method in permissions.SAFE_METHODS


class AdsListView(viewsets.ModelViewSet):
    queryset = models.Advt.objects.all()

    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]

    pagination_class = ResultSetPagination

    filter_backends = (filters.DjangoFilterBackend,)

    filterset_class = AdvtFilter

    serializers = {
        'default': serializers.AdsListSerializer,
        'list':    serializers.AdsListSerializer,
        'retrieve':    serializers.SingleAdvtSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class DealTypeListView(viewsets.ModelViewSet):
    queryset = models.Deal_type.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.DealTypeSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


# class DealTypeListView(viewsets.ModelViewSet):
#     queryset = models.Deal_type.objects.all()
#     permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
#     serializers = {
#         'default': serializers.DealTypeSerializer,
#     }

#     def get_serializer_class(self):
#         return self.serializers.get(self.action,
#                                     self.serializers['default'])


class ObjectTypeListView(viewsets.ModelViewSet):
    queryset = models.Object_type.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.ObjectTypeSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class ObjectTypesAndKindsListView(viewsets.ModelViewSet):
    queryset = models.Object_types_and_kinds.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.ObjectTypesAndKindsSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class ObjectKindListView(viewsets.ModelViewSet):
    queryset = models.Object_kind.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.ObjectKindSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


# class ObjectKindListView(viewsets.ModelViewSet):
#     queryset = models.Object_kind.objects.all()
#     permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
#     serializers = {
#         'default': serializers.ObjectKindSerializer,
#     }

#     def get_serializer_class(self):
#         return self.serializers.get(self.action,
#                                     self.serializers['default'])


class ObjectAddressListView(viewsets.ModelViewSet):
    queryset = models.Object_address.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.ObjectAddressSerializer,
    }
    
    def get_serializer_class(self):        
        print('========== ==== Сработал: api.ObjectAddressListView.get_serializer_class ')
        print('Проба получить контекст сериалайзера', self.serializers['default']['address_street'])
        try:
            print('========== ==== Проверяем на уникальность комбинации' )
            # print('========== ==== имеем данные queryset', self.queryset )
            # address = models.Object_address()
            # print('========== ==== имеем данные address', address )
            # address.full_clean()
            assa = serializers.ObjectAddressSerializer
            # print('========== ==== Отправляем дальше', assa.get_fields() )
            return self.serializers.get(self.action,
                                        self.serializers['default'])
        except ValidationError as e:
            print(f'Ошибочка вышла: {e}')
            return e
        except :
            print('Какая-то другая ошибка')
            # Do something based on the errors contained in e.message_dict.
            # Display them to a user, or handle them programmatically.
            # pass


class AddressRegionListView(viewsets.ModelViewSet):
    queryset = models.Address_region.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.AddressRegionSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class AddressLocalityListView(viewsets.ModelViewSet):
    queryset = models.Address_locality.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.AddressLocalitySerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class AddressDistrictListView(viewsets.ModelViewSet):
    queryset = models.Address_district.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.AddressDistrictSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class AddressStreetListView(viewsets.ModelViewSet):
    queryset = models.Address_street.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.AddressStreetSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])


class SourceListView(viewsets.ModelViewSet):
    queryset = models.Source.objects.all()
    permission_classes = [Or(IsReadyOnlyRequest, permissions.IsAdminUser)]
    serializers = {
        'default': serializers.SourceSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action,
                                    self.serializers['default'])
