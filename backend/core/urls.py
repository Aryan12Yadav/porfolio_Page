from django.urls import path
from . import views

urlpatterns = [
    path("projects/", views.ProjectListCreate.as_view(), name="project-list-create"),
    path("projects/<int:pk>/", views.ProjectRetrieveUpdateDelete.as_view(), name="project-rud"),
    path("interview-requests/", views.InterviewRequestCreate.as_view(), name="interview-request-create"),
]
