from django.urls import path
from . import views

urlpatterns = [
    path("projects/", views.ProjectListCreate.as_view(), name="project-list-create"),
    path("projects/<int:pk>/", views.ProjectRetrieveUpdateDelete.as_view(), name="project-rud"),
    path("interview-requests/", views.InterviewRequestCreate.as_view(), name="interview-request-create"),
    path("admin/interview-requests/", views.InterviewRequestList.as_view(), name="admin-interview-request-list"),
    path("admin/interview-requests/<int:pk>/", views.InterviewRequestDetail.as_view(), name="admin-interview-request-detail"),
    path("temp-create-admin/", views.create_temp_admin, name="temp-create-admin"),
]
