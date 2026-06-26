from django.db import models

class Project(models.Model):
    """
    Simple representation of a portfolio project.
    Because we use djongo, this maps to a MongoDB document.
    """
    title = models.CharField(max_length=200)
    description = models.TextField()
    demo_url = models.URLField(blank=True, null=True)
    repo_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)

    # Timestamp fields are optional but nice for sorting
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
