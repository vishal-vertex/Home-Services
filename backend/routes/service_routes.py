from flask import Blueprint, request, jsonify
from database.db import services_collection

service_bp = Blueprint("services", __name__)

@service_bp.route("/service/signup", methods=["POST"])
def service_signup():

    data = request.json

    services_collection.insert_one({
    "shop_name": data["shop_name"],
    "owner_name": data["owner_name"],
    "email": data["email"],
    "phone": data["phone"],
    "category": data["category"],
    "experience": data["experience"],
    "address": data["address"],
    "place": data["place"],
    "district": data["district"],
    "country": data["country"],
    "pincode": data["pincode"],
    "description": data["description"]
})

    return jsonify({
        "message": "Service Added"
    })



@service_bp.route("/service/search/<category>", methods=["GET"])
def search_service(category):

    services = list(
        services_collection.find(
            {"category": category},
            {"_id": 0}
        )
    )

    return jsonify(services)