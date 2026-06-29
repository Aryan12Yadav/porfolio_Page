from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import InterviewRequest

class InterviewRequestTests(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='password123'
        )
        self.interview_request = InterviewRequest.objects.create(
            recruiter_name="Jane Doe",
            company="Google",
            email="jane@google.com",
            phone="+15555555555",
            message="Let's connect for an interview",
            requested_date="2026-07-01T10:00:00Z"
        )

    def test_create_interview_request(self):
        url = reverse('interview-request-create')
        data = {
            'recruiter_name': 'John Smith',
            'company': 'Netflix',
            'email': 'john@netflix.com',
            'phone': '+12222222222',
            'message': 'Interested in your MLOps experience',
            'requested_date': '2026-07-02T14:30:00Z'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(InterviewRequest.objects.count(), 2)
        self.assertEqual(InterviewRequest.objects.latest('created_at').recruiter_name, 'John Smith')

    def test_list_requests_unauthenticated_succeeds(self):
        url = reverse('admin-interview-request-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_list_requests_authenticated_admin_succeeds(self):
        url = reverse('admin-interview-request-list')
        self.client.login(username='admin', password='password123')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['recruiter_name'], 'Jane Doe')

    def test_delete_request_unauthenticated_fails(self):
        url = reverse('admin-interview-request-detail', kwargs={'pk': self.interview_request.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_request_authenticated_admin_succeeds(self):
        url = reverse('admin-interview-request-detail', kwargs={'pk': self.interview_request.pk})
        self.client.login(username='admin', password='password123')
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(InterviewRequest.objects.count(), 0)
