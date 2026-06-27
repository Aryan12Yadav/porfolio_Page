from django.contrib import admin
from .models import Project, InterviewRequest

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title',)

@admin.register(InterviewRequest)
class InterviewRequestAdmin(admin.ModelAdmin):
    list_display = ('recruiter_name', 'company', 'email', 'requested_date', 'created_at')
    search_fields = ('recruiter_name', 'company', 'email')
    list_filter = ('requested_date', 'created_at')