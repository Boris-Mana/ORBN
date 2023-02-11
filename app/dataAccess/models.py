import uuid
from django.db import models


class Address_locality(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Населенный пункт', max_length=100, unique=True)

    def __str__(self):
        return self.name


class Address_district(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Район', max_length=100, blank=True, unique=True)

    def __str__(self):
        return self.name


class Address_region(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Область', max_length=100, unique=True)

    def __str__(self):
        return self.name


class Address_street(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(
        'Название улицы', max_length=100, blank=True, unique=True)

    def __str__(self):
        return self.name


class Object_kind(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Назначение', max_length=50, unique=True)

    def __str__(self):
        return self.name


class Object_type(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Тип объекта', max_length=50, unique=True)

    def __str__(self):
        return self.name


class Object_types_and_kinds(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    object_kind = models.ForeignKey(
        Object_kind, verbose_name='Назначение', on_delete=models.DO_NOTHING)
    object_type = models.ForeignKey(
        Object_type, verbose_name='Тип объекта', on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.object_kind.name + ", " + self.object_type.name

    class Meta:
        unique_together = ('object_kind', 'object_type',)


class Object_address(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    raw_string = models.TextField(
        'исходная текстовая строка', blank=True, null=True)
    address_region = models.ForeignKey(
        Address_region, verbose_name='Область', on_delete=models.DO_NOTHING)
    address_locality = models.ForeignKey(
        Address_locality, verbose_name='Населенный пункт', on_delete=models.DO_NOTHING, blank=True, null=True)
    address_district = models.ForeignKey(
        Address_district, verbose_name='Район', on_delete=models.DO_NOTHING, blank=True, null=True)
    address_street = models.ForeignKey(
        Address_street, verbose_name='Улица', on_delete=models.DO_NOTHING, blank=True, null=True)
    object_number = models.CharField(
        'Номер дома, квартиры и пр.', max_length=70, blank=True, null=True)

    def __str__(self):
        return self.raw_string or ''


class Deal_type(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Тип сделки', max_length=50, unique=True)

    def __str__(self):
        return self.name


class Source(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Источник', max_length=50, unique=True)

    def __str__(self):
        return self.name


class Advt(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_link = models.ForeignKey(
        Source, on_delete=models.DO_NOTHING, null=True)
    source_id = models.CharField('Id в источнике', max_length=20)
    placement_date = models.DateTimeField(
        'Дата публикации', blank=True, null=True)
    download_date = models.DateTimeField('Дата парсинга')
    original_link = models.URLField(
        'Ссылка на исходное размещение объекта', max_length=300)
    square = models.DecimalField(
        'Площадь объекта', max_digits=20, decimal_places=2)
    price = models.DecimalField(
        'Цена объекта', max_digits=20, decimal_places=2)
    unit_price = models.DecimalField(
        'Удельная цена', max_digits=20, decimal_places=2)
    short_description = models.TextField(
        'Краткое описание', blank=True, null=True)
    full_description = models.TextField(
        'Полное описание', blank=True, null=True)
    phone_number = models.CharField(
        'Номер телефона', max_length=20, blank=True, null=True)
    object_types_and_kinds = models.ForeignKey(
        Object_types_and_kinds, on_delete=models.DO_NOTHING)
    deal_type = models.ForeignKey(Deal_type, on_delete=models.DO_NOTHING)
    object_address = models.ForeignKey(
        Object_address, on_delete=models.DO_NOTHING)

    def __str__(self):        
        return str(self.id) + " " + self.full_description
