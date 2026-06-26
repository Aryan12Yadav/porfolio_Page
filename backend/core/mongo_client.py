import os
from pymongo import MongoClient

def get_collection(collection_name: str = "projects"):
    """Return a MongoDB collection.
    Reads MONGO_URI and MONGO_DB_NAME from .env (loaded in settings).
    """
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("MONGO_DB_NAME", "portfolio")
    if not mongo_uri:
        raise RuntimeError("MONGO_URI not set in environment")
    client = MongoClient(mongo_uri)
    db = client[db_name]
    return db[collection_name]
