from django.contrib import admin
from .models import Board, Task

# Register your models here.
class BoardAdmin(admin.ModelAdmin):
    list_display = ["title"]

class TaskAdmin(admin.ModelAdmin):
    list_display = ["title", "description"]

admin.site.register(Board, BoardAdmin)
admin.site.register(Task, TaskAdmin)
