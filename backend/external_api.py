import requests
from fastapi import HTTPException

def fetch_food_nutrition(food: str, quantity: int, api_key: str):
    """
    Fetch nutrition data for a single food item from the Nutritionix API.
    """
    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "x-app-id": "YOUR_APP_ID",
        "x-app-key": api_key,
        "Content-Type": "application/json"
    }
    payload = {"query": f"{quantity} {food}"}
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch food nutrition data")
    
    data = response.json()
    nutrients = data["foods"][0]
    return {
        "calories": nutrients.get("nf_calories", 0),
        "protein": nutrients.get("nf_protein", 0),
        "fat": nutrients.get("nf_total_fat", 0),
        "sugars": nutrients.get("nf_sugars", 0),
        "carbs": nutrients.get("nf_total_carbohydrate", 0)
    }

def fetch_recipe_nutrition(ingredients: list, api_key: str):
    """
    Fetch nutrition data for a recipe from the Nutritionix API.
    """
    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "x-app-id": "YOUR_APP_ID",
        "x-app-key": api_key,
        "Content-Type": "application/json"
    }
    payload = {"query": " ".join(ingredients)}
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch recipe nutrition data")
    
    data = response.json()
    total_nutrients = {
        "calories": sum(item.get("nf_calories", 0) for item in data["foods"]),
        "protein": sum(item.get("nf_protein", 0) for item in data["foods"]),
        "fat": sum(item.get("nf_total_fat", 0) for item in data["foods"]),
        "sugars": sum(item.get("nf_sugars", 0) for item in data["foods"]),
        "carbs": sum(item.get("nf_total_carbohydrate", 0) for item in data["foods"])
    }
    return total_nutrients