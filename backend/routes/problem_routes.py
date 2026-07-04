from flask import Blueprint, request, jsonify
from database.db import problem_reports_collection
import google.generativeai as genai

from PIL import Image
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

problem_bp = Blueprint("problems", __name__)

UPLOAD_FOLDER = "uploads"

@problem_bp.route("/problem/upload", methods=["POST"])
def upload_problem():

    user_id = request.form["user_id"]
    problem_description = request.form["problem_description"]

    image = request.files["problem_image"]

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    image_path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    image.save(image_path)

    img = Image.open(image_path)

    model = genai.GenerativeModel("gemini-flash-lite-latest")

    prompt = """
    Analyze the uploaded home problem image and description.

    Return ONLY ONE category:

    Electrician
    Plumber
    Carpenter
    Painter
    AC Technician
    Appliance Repair
    Mason
    General Maintenance

    Do not explain.
    Return only the category name.
    """

    response = model.generate_content(
        [prompt, img, problem_description]
    )

    predicted_category = response.text.strip()

    problem_reports_collection.insert_one({
        "user_id": user_id,
        "problem_description": problem_description,
        "problem_image": image_path,
        "predicted_category": predicted_category
    })

    return jsonify({
        "predicted_category": predicted_category
    })