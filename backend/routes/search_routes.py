from flask import Blueprint, request, jsonify
from bson import ObjectId

from database.db import users_collection
from database.db import services_collection

search_bp = Blueprint("search", __name__)

@search_bp.route("/service/search", methods=["POST"])
def search_service():

    data = request.json

    user_id = data["user_id"]
    category = data["category"]

    user = users_collection.find_one({
        "_id": ObjectId(user_id)
    })
    
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Level 1 - Pincode
    services = list(
        services_collection.find({
            "category": category,
            "pincode": user["pincode"]
        }, {"_id": 0})
    )

    # Level 2 - Place
    if not services:
        services = list(
            services_collection.find({
                "category": category,
                "place": user["place"]
            }, {"_id": 0})
        )

    # Level 3 - District
    if not services:
        services = list(
            services_collection.find({
                "category": category,
                "district": user["district"]
            }, {"_id": 0})
        )

    # Level 4 - Country
    if not services:
        services = list(
            services_collection.find({
                "category": category,
                "country": user["country"]
            }, {"_id": 0})
        )

    return jsonify(services)