import os
import logging
from pymongo import MongoClient

logger = logging.getLogger(__name__)

def get_collection(collection_name: str = "projects"):
    """Return a MongoDB collection.
    Reads MONGO_URI and MONGO_DB_NAME from .env (loaded in settings).
    Logs the values for debugging.
    """
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("MONGO_DB_NAME", "portfolio")
    logger.debug("MONGO_URI loaded: %s", "<set>" if mongo_uri else "<missing>")
    logger.debug("MONGO_DB_NAME loaded: %s", db_name)
    if not mongo_uri:
        logger.error("MONGO_URI not set – check .env file in backend directory")
        raise RuntimeError("MONGO_URI not set in environment")
    client = MongoClient(mongo_uri)
    db = client[db_name]
    return db[collection_name]
