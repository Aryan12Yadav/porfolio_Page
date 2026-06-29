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
    permission_classes = [permissions.IsAdminUser]
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
    
    # 1. Setup 'aryan' user
    aryan_user, aryan_created = User.objects.get_or_create(username='aryan', defaults={'email': 'aryanyadav892408@gmail.com'})
    aryan_user.set_password('12345')
    aryan_user.is_staff = True
    aryan_user.is_superuser = True
    aryan_user.save()
    
    # 2. Setup 'admin' user
    admin_user, admin_created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@example.com'})
    admin_user.set_password('admin12345')
    admin_user.is_staff = True
    admin_user.is_superuser = True
    admin_user.save()
        
    projects_seeded = 0
    if Project.objects.count() == 0:
        default_projects = [
            {
                "title": "Premium Blogging System",
                "description": "A secure, features-rich blogging platform with user authentication, CRUD operations, and content management tools built on React, Django, and PostgreSQL.",
                "tech_stack": "React, Django, Django REST Framework, PostgreSQL, JWT Authentication, AWS S3",
                "implementation_details": "Designed and implemented user registration, secure login session system, and profile management using JWT authentication. Developed robust REST APIs using Django REST Framework for creating, reading, updating, and deleting blog posts. Configured categories, custom tags, likes, comments, and file upload system storing assets in cloud media containers.",
                "challenges_solved": "Optimized database querying for posts, tags, and comment hierarchies using Django's select_related and prefetch_related, reducing page load latency by 45%. Implemented strict permission classes ensuring only authorized authors can modify their posts.",
                "key_learnings": "Mastered token-based authentication and secure session storage on frontend. Gained hands-on experience in API pagination, search filtering, and designing scalable relational schemas for content platforms.",
                "demo_url": "https://github.com/Aryan12Yadav/Premium-Bloggin-System",
                "repo_url": "https://github.com/Aryan12Yadav/Premium-Bloggin-System"
            },
            {
                "title": "AI Medical Copilot",
                "description": "An intelligent healthcare intelligence platform designed to extract, analyze, and compare medical reports using OCR and Multi-Agent AI architecture.",
                "tech_stack": "FastAPI, React, PostgreSQL, SQLAlchemy, LangChain, OCR, JWT Authentication",
                "implementation_details": "Built a medical report processing workflow: user upload -> Tesseract OCR text extraction -> AI report analysis mapping key health data (Patient info, category, risk indicators). Integrated report-specific interactive AI chat assisting patients in query resolution. Added report comparison tracking health score trends over time.",
                "challenges_solved": "Established a strict medical safety guardrails framework preventing AI from hallucinating unsupported diagnoses or drug prescriptions. Configured optimized SQLAlchemy transaction pools for multi-page document metadata parsing.",
                "key_learnings": "Developed proficiency in LangChain agent systems, PDF OCR text preprocessing, and structuring unstructured medical documentation into compliant database records.",
                "demo_url": "https://github.com/Aryan12Yadav/Multi-Agent-Healthcare-Copilot-f",
                "repo_url": "https://github.com/Aryan12Yadav/Multi-Agent-Healthcare-Copilot-f"
            },
            {
                "title": "MLOps Training Pipeline",
                "description": "A production-grade machine learning pipeline predicting vehicle insurance purchases, containerized with Docker and auto-deployed to AWS EC2 via GitHub Actions.",
                "tech_stack": "Python, FastAPI, MongoDB Atlas, AWS S3, Docker, GitHub Actions, self-hosted runner, EC2",
                "implementation_details": "Engineered modular pipeline stages: data ingestion from MongoDB Atlas, validation against YAML schema, transformation (SMOTEENN handling class imbalance, ColumnTransformer), Random Forest classifier training, model evaluation comparing to S3 registry, and deployment of accepted model to AWS S3. Served inference via FastAPI.",
                "challenges_solved": "Built automated CI/CD workflows executing a build-test runner block on an AWS EC2 t2.medium self-hosted runner. Managed automated container cleanup and hot-swapping exposed ports for zero-downtime rolling model updates.",
                "key_learnings": "Learned end-to-end MLOps pipeline stages, drift validation, container orchestration with Docker, IAM policy configuration, and GitOps self-hosted CI/CD automation.",
                "demo_url": "https://github.com/Aryan12Yadav/full_stack_mlops_project2026",
                "repo_url": "https://github.com/Aryan12Yadav/full_stack_mlops_project2026"
            }
        ]
        for proj in default_projects:
            Project.objects.create(**proj)
            projects_seeded += 1

    msg = [
        "Setup completed:",
        f"- User 'aryan' (password: 12345) - Active & Admin: Yes",
        f"- User 'admin' (password: admin12345) - Active & Admin: Yes"
    ]
    if projects_seeded > 0:
        msg.append(f"- Seeded {projects_seeded} default projects into the database.")
    else:
        msg.append("- Database projects already seeded.")
    return HttpResponse("<br>".join(msg))
