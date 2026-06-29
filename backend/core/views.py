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
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

class UserRegisterView(APIView):
    """
    API View to handle user registration.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')

        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)

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
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication]

