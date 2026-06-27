from django.db import models

class Project(models.Model):
    """
    Detailed representation of a portfolio project.
    Maps directly to a PostgreSQL database table.
    """
    title = models.CharField(max_length=200)
    description = models.TextField()
    
    tech_stack = models.CharField(
        max_length=500, 
        blank=True, 
        null=True, 
        help_text="Comma-separated tech tags (e.g. React, Django, PostgreSQL)"
    )
    implementation_details = models.TextField(
        blank=True, 
        null=True, 
        help_text="Detailed description of features and modules"
    )
    challenges_solved = models.TextField(
        blank=True, 
        null=True, 
        help_text="Key engineering challenges solved during development"
    )
    key_learnings = models.TextField(
        blank=True, 
        null=True, 
        help_text="Major technical learnings and takeaways"
    )

    demo_url = models.URLField(blank=True, null=True)
    repo_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class InterviewRequest(models.Model):
    """
    Represents an interview schedule request submitted by a recruiter.
    """
    recruiter_name = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    requested_date = models.DateTimeField(help_text="Tentative date and time for the interview")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.recruiter_name} ({self.company})"
