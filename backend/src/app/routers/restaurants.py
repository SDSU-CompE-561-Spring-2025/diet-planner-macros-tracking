from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

NUTRITIONIX_API_KEY = "28bb7f2eebd765b0a774a576cc1a2ac0"  # Updated API key
NUTRITIONIX_API_URL = "https://developer.nutritionix.com/admin/applications/1409625665426"

@router.get("/nearby", responses={
    200: {"description": "List of nearby restaurants retrieved successfully"},
    400: {"description": "Invalid request parameters"},
    500: {"description": "Failed to fetch data from Yelp"}
})
def get_nearby_restaurants(location: str, cuisine: str = None, price: str = None):
    headers = {"Authorization": f"Bearer {NUTRITIONIX_API_KEY}"}
    params = {
        "term": cuisine if cuisine else "restaurant",
        "location": location,
        "price": price,
        "limit": 10
    }

    response = requests.get(NUTRITIONIX_API_URL, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        return {"restaurants": data["businesses"]}
    else:
        raise HTTPException(status_code=500, detail="Failed to fetch data from Yelp")