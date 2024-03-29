from rest_framework.pagination import LimitOffsetPagination


class ResultSetPagination(LimitOffsetPagination):
    default_limit = 25
    max_limit = 100