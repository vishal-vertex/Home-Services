from flask import Blueprint, request, jsonify
from database.db import users_collection

user_bp = Blueprint("users", __name__)

@user_bp.route("/user/signup", methods=["POST"])
def signup():   

    data = request.json

    users_collection.insert_one({
        
    "name": data["name"],
    "email": data["email"],
    "phone": data["phone"],
    "address": data["address"],
    "place": data["place"],
    "district": data["district"],
    "country": data["country"],
    "pincode": data["pincode"]

    })

    return jsonify({
        "message": "Signup successful"
    })

@user_bp.route("/user/login", methods=["POST"])
def login():

    data = request.json

    user = users_collection.find_one({
        "email": data["email"]
    })

    if user:
        return jsonify({
            "message": "Login Successful",
            "user_id": str(user["_id"])
        })

    return jsonify({
        "message": "User Not Found"
    }), 404