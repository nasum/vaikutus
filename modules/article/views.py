import django_filters
from rest_framework.response import Response
from rest_framework import viewsets, filters

from .models import Article
from .serializer import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.order_by('-created_at').all()
    serializer_class = ArticleSerializer
    def create(self, request):
        current_user = request.user
        data = request.data
        data['author_id'] = current_user.id
        serializer = ArticleSerializer(data=data)
        if serializer.is_valid():
            serializer.create(data)
            return Response({ 'message': 'ok' })
        else:
            return Response(serializer.errors)
