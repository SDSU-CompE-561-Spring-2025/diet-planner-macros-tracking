from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
import httpx
import os
from math import radians, sin, cos, sqrt, atan2

router = APIRouter(tags=["restaurants"])

class Restaurant(BaseModel):
    id: str
    name: str
    address: str
    distance: float
    nutritionScore: float
    averageCalories: int
    healthyOptionsCount: int
    menuUrl: str

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371  # Earth's radius in kilometers

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    distance = R * c

    return distance

@router.get("/nearby", response_model=List[Restaurant])
async def get_nearby_restaurants(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude"),
    radius: float = Query(5.0, description="Search radius in kilometers")
):
    # In a real application, you would:
    # 1. Use a restaurant API (like Google Places, Yelp, etc.)
    # 2. Query a database of restaurant nutritional information
    # 3. Combine and process the data
    
    # For demo purposes, we'll return mock data
    mock_restaurants = [
        {
            "id": "1",
            "name": "Green Kitchen",
            "address": "123 Healthy St",
            "distance": 0.8,
            "nutritionScore": 9.2,
            "averageCalories": 450,
            "healthyOptionsCount": 15,
            "menuUrl": "https://example.com/menu1"
        },
        {
            "id": "2",
            "name": "Fresh & Fit Cafe",
            "address": "456 Fitness Ave",
            "distance": 1.2,
            "nutritionScore": 8.5,
            "averageCalories": 520,
            "healthyOptionsCount": 12,
            "menuUrl": "https://example.com/menu2"
        },
        {
            "id": "3",
            "name": "Protein Paradise",
            "address": "789 Muscle Rd",
            "distance": 2.1,
            "nutritionScore": 7.8,
            "averageCalories": 650,
            "healthyOptionsCount": 8,
            "menuUrl": "https://example.com/menu3"
        },
        {
            "id": "4",
            "name": "Balanced Bowl",
            "address": "321 Nutrition Blvd",
            "distance": 3.5,
            "nutritionScore": 8.9,
            "averageCalories": 480,
            "healthyOptionsCount": 18,
            "menuUrl": "https://example.com/menu4"
        },
        {
            "id": "5",
            "name": "Macro Masters",
            "address": "654 Diet Dr",
            "distance": 4.2,
            "nutritionScore": 8.1,
            "averageCalories": 550,
            "healthyOptionsCount": 10,
            "menuUrl": "https://example.com/menu5"
        }
    ]

    # Filter restaurants by radius
    nearby_restaurants = [
        restaurant for restaurant in mock_restaurants
        if restaurant["distance"] <= radius
    ]

    return nearby_restaurants