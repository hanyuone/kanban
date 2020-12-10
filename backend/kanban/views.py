from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BoardSerializer, TaskSerializer
from .models import Board, Task

# Create your views here.
class BoardView(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    queryset = Board.objects.all()

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
