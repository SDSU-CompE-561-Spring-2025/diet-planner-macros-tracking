import requests
from fastapi import FastAPI, Query

app = FastAPI()

YELP_API_KEY = "your_yelp_api_key"
YELP_API_URL = "https://api.yelp.com/v3/businesses/search"

@app.get("/api/restaurants/nearby")
def get_nearby_restaurants(location: str, cuisine: str = Query(None), price: str = Query(None)):
    headers = {"Authorization": f"Bearer {YELP_API_KEY}"}
    params = {
        "term": cuisine if cuisine else "restaurant",
        "location": location,
        "price": price,  # 1 = cheap, 2 = moderate, 3 = expensive
        "limit": 10
    }

    response = requests.get(YELP_API_URL, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        return {"restaurants": data["businesses"]}
    else:
        return {"error": "Failed to fetch data from Yelp", "status_code": response.status_code}
