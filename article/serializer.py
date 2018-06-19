from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Article

class UserSocialAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ArticleSerializer(serializers.ModelSerializer):
    author = UserSocialAuthSerializer(read_only=True)
    class Meta:
        model = Article
        fields = ('id', 'title', 'body', 'created_at', 'author')
    def create(self, validated_data):
        return Article(**validated_data).save()