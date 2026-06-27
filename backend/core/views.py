from rest_framework import generics
from .models import Project, InterviewRequest
from .serializers import ProjectSerializer, InterviewRequestSerializer

class ProjectListCreate(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer

class ProjectRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class InterviewRequestCreate(generics.CreateAPIView):
    """
    API View to handle submission of interview requests.
    Allowed HTTP method: POST
    """
    queryset = InterviewRequest.objects.all()
    serializer_class = InterviewRequestSerializer
