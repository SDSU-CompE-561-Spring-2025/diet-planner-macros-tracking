from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

NUTRITIONIX_APP_ID = "api_id"
NUTRITIONIX_APP_KEY = "api_key"
NUTRITIONIX_API_URL = "https://trackapi.nutritionix.com/v2/locations"
GEOCODING_API_URL = "https://api.opencagedata.com/geocode/v1/json"
GEOCODING_API_KEY = "api_key"  # Replace with your OpenCage API key

def get_lat_lon(location: str):
    """Fetch latitude and longitude for a given location using OpenCage Geocoder."""
    response = requests.get(
        GEOCODING_API_URL,
        params={"q": location, "key": GEOCODING_API_KEY}
    )
    if response.status_code == 200:
        data = response.json()
        if data["results"]:
            lat = data["results"][0]["geometry"]["lat"]
            lon = data["results"][0]["geometry"]["lng"]
            return lat, lon
        else:
            raise HTTPException(status_code=404, detail="Location not found")
    else:
        raise HTTPException(status_code=500, detail="Failed to fetch geocoding data")

@router.get("/nearby")
def get_nearby_restaurants(location: str, cuisine: str = None, price: str = None):
    # Get latitude and longitude for the location
    latitude, longitude = get_lat_lon(location)

    # Prepare parameters for NutritionX API
    params = {
        "ll": f"{latitude},{longitude}",
        "distance": 10,  # Search radius in miles
        "limit": 10
    }
    
    if cuisine:
        params["term"] = cuisine
    
    if price:
        params["price"] = price

    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_APP_KEY,
    }

    # Log the request details
    print(f"Request URL: {NUTRITIONIX_API_URL}")
    print(f"Request Headers: {headers}")
    print(f"Request Params: {params}")

    response = requests.get(NUTRITIONIX_API_URL, headers=headers, params=params)

    # Log the response for debugging
    print(f"NutritionX Response Status Code: {response.status_code}")
    print(f"NutritionX Response Text: {response.text}")

    if response.status_code == 200:
        try:
            data = response.json()
            return {"restaurants": data.get("businesses", [])}
        except ValueError:
            raise HTTPException(status_code=500, detail="Invalid JSON response from NutritionX")
    else:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from NutritionX: {response.text}")