from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .mongo_client import get_collection
from bson import ObjectId
import json

class ProjectListCreate(APIView):
    """List all projects or create a new one using pymongo."""
    def get(self, request):
        collection = get_collection()
        projects = []
        for doc in collection.find():
            doc["id"] = str(doc["_id"])
            doc.pop("_id", None)
            projects.append(doc)
        return Response(projects)

    def post(self, request):
        collection = get_collection()
        data = request.data.copy()
        # Mongo will generate _id automatically
        result = collection.insert_one(data)
        data["id"] = str(result.inserted_id)
        return Response(data, status=status.HTTP_201_CREATED)

class ProjectRetrieveUpdateDelete(APIView):
    """Retrieve, update, or delete a project by its MongoDB ObjectId."""
    def get_object(self, pk):
        collection = get_collection()
        try:
            obj = collection.find_one({"_id": ObjectId(pk)})
            if not obj:
                return None
            obj["id"] = str(obj["_id"])
            obj.pop("_id", None)
            return obj
        except Exception:
            return None

    def get(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(obj)

    def put(self, request, pk):
        collection = get_collection()
        data = request.data.copy()
        result = collection.update_one({"_id": ObjectId(pk)}, {"$set": data})
        if result.matched_count == 0:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        data["id"] = pk
        return Response(data)

    def delete(self, request, pk):
        collection = get_collection()
        result = collection.delete_one({"_id": ObjectId(pk)})
        if result.deleted_count == 0:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
