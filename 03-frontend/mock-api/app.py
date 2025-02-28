from uuid import uuid4
from flask import Flask, request, jsonify, render_template, make_response, redirect
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import json
import os
import base64
from dotenv import load_dotenv




app = Flask(__name__)
app.config.from_object('config.Config')

jwt = JWTManager(app)
CORS(app) # Enable CORS for all routes


encoded_data = os.environ.get('USERS_DATA')

if encoded_data:
    decoded_data = base64.b64decode(encoded_data).decode('utf-8')
    users = json.loads(decoded_data)
else:
    users = []

with open('data/places.json') as f:
    places = json.load(f)

# In-memory storage for new reviews
new_reviews = []

@app.route('/add-review', methods=['GET'])
def review():
    return render_template("add_review.html")


@app.route('/details', methods=['GET'])
def show_details():
    return render_template("place.html")


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    
    if not user:
        print(f"User not found or invalid password for: {email}")
        return jsonify({"msg": users}), 401

    access_token = create_access_token(identity=user['id'])
    return jsonify(access_token=access_token)

@app.route('/login', methods=['GET'])
def login_get():
    return render_template("login.html")
@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/places', methods=['GET'])
def get_places():
    response = [
        {
            "id": place['id'],
            "host_id": place['host_id'],
            "host_name": place['host_name'],
            "description": place['description'],
            "price_per_night": place['price_per_night'],
            "city_id": place['city_id'],
            "city_name": place['city_name'],
            "country_code": place['country_code'],
            "country_name": place['country_name']
        }
        for place in places
    ]
    return jsonify(response)

@app.route('/places/<place_id>', methods=['GET'])
def get_place(place_id):
    place = next((p for p in places if p['id'] == place_id), None)

    if not place:
        return jsonify({"msg": "Place not found"}), 404

    response = {
        "id": place['id'],
        "host_id": place['host_id'],
        "host_name": place['host_name'],
        "description": place['description'],
        "number_of_rooms": place['number_of_rooms'],
        "number_of_bathrooms": place['number_of_bathrooms'],
        "max_guests": place['max_guests'],
        "price_per_night": place['price_per_night'],
        "latitude": place['latitude'],
        "longitude": place['longitude'],
        "city_id": place['city_id'],
        "city_name": place['city_name'],
        "country_code": place['country_code'],
        "country_name": place['country_name'],
        "amenities": place['amenities'],
        "reviews": place['reviews'] + [r for r in new_reviews if r['place_id'] == place_id]
    }
    return jsonify(response)

@app.route('/places/<place_id>/reviews', methods=['POST'])
@jwt_required()
def add_review(place_id):
    current_user_id = get_jwt_identity()
    user = next((u for u in users if u['id'] == current_user_id), None)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    review_text = request.json.get('review')
    new_review = {
        "user_name": user['name'],
        "rating": request.json.get('rating'),
        "comment": review_text,
        "place_id": place_id
    }

    new_reviews.append(new_review)
    return jsonify({"msg": "Review added"}), 201



@app.route('/log-out', methods=['POST'])
@jwt_required()
def log_out():
    response = make_response(redirect('/'))
    response.set_cookie('token', '', expires=0)
    return response

if __name__ == '__main__':
    app.run(debug=False)