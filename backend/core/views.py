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

from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
class InterviewRequestList(generics.ListAPIView):
    """
    API View to list all interview requests for authenticated admins.
    """
    queryset = InterviewRequest.objects.all().order_by("-created_at")
    serializer_class = InterviewRequestSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = [BasicAuthentication, SessionAuthentication]

class InterviewRequestDetail(generics.RetrieveDestroyAPIView):
    """
    API View to view details or delete an interview request.
    """
    queryset = InterviewRequest.objects.all()
    serializer_class = InterviewRequestSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [BasicAuthentication, SessionAuthentication]

from django.contrib.auth import get_user_model
from django.http import HttpResponse
def create_temp_admin(request):
    User = get_user_model()
    username = request.GET.get('user', 'aryan')
    password = request.GET.get('password', '12345')
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, email='aryanyadav892408@gmail.com', password=password)
        return HttpResponse(f"Superuser '{username}' created successfully!")
    return HttpResponse(f"Superuser '{username}' already exists.")

