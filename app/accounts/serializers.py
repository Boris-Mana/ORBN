from rest_framework import serializers
from .models import ORBNUser
from django.contrib.auth import authenticate

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ORBNUser
        fields = ('id', 'first_name', 'last_name',
                  'email', 'phone', 'is_active')

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ORBNUser
        fields = ('id', 'first_name',
                  'last_name', 'email', 'phone', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = ORBNUser.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            password=validated_data['password'])

        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):    
    email = serializers.EmailField()
    password = serializers.CharField()

    # print('Сработал серилайзер логина. Креды:', email, password)

    def validate(self, data):
        # print('Ф-ция validate и в LoginSerial. На входе:', data)
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Incorrect Credentials or inactive user")
