from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer

class ProjectListCreate(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer

class ProjectRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
