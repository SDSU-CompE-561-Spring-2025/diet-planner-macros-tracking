from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

YELP_API_KEY = "your_yelp_api_key"
YELP_API_URL = "https://api.yelp.com/v3/businesses/search"

@router.get("/nearby", responses={
    200: {"description": "List of nearby restaurants retrieved successfully"},
    400: {"description": "Invalid request parameters"},
    500: {"description": "Failed to fetch data from Yelp"}
})
def get_nearby_restaurants(location: str, cuisine: str = None, price: str = None):
    headers = {"Authorization": f"Bearer {YELP_API_KEY}"}
    params = {
        "term": cuisine if cuisine else "restaurant",
        "location": location,
        "price": price,
        "limit": 10
    }

    response = requests.get(YELP_API_URL, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        return {"restaurants": data["businesses"]}
    else:
        raise HTTPException(status_code=500, detail="Failed to fetch data from Yelp")