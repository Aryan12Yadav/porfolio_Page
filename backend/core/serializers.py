from rest_framework import serializers
from .models import Project, InterviewRequest

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class InterviewRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewRequest
        fields = "__all__"
