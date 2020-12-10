from django.db import models

# Create your models here.
class Board(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title

class Task(models.Model):
    board = models.ForeignKey(Board, default=1, related_name="tasks", on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.TextField()

    def __str__(self):
        return self.title
