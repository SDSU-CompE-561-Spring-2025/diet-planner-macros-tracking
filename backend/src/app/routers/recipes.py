from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter(tags=["recipes"])

class Recipe(BaseModel):
    id: str
    name: str
    calories: int
    ingredients: List[str]
    instructions: List[str]
    preparationTime: int  # in minutes
    cookingTime: int  # in minutes
    servings: int
    difficulty: str
    tags: List[str]

@router.get("/", response_model=List[Recipe])
async def get_recipes():
    # Mock data for demonstration
    recipes = [
        {
            "id": "1",
            "name": "Healthy Chicken Salad",
            "calories": 350,
            "ingredients": [
                "2 cups mixed greens",
                "6 oz grilled chicken breast",
                "1 tbsp olive oil",
                "1/2 avocado",
                "Cherry tomatoes",
                "Cucumber"
            ],
            "instructions": [
                "Grill the chicken breast",
                "Chop vegetables",
                "Mix ingredients",
                "Add dressing"
            ],
            "preparationTime": 15,
            "cookingTime": 20,
            "servings": 1,
            "difficulty": "Easy",
            "tags": ["healthy", "high-protein", "low-carb"]
        },
        {
            "id": "2",
            "name": "Protein Smoothie Bowl",
            "calories": 400,
            "ingredients": [
                "1 banana",
                "1 scoop protein powder",
                "1 cup almond milk",
                "1/2 cup berries",
                "1 tbsp chia seeds",
                "1 tbsp honey"
            ],
            "instructions": [
                "Blend banana, protein powder, and milk",
                "Pour into bowl",
                "Top with berries and seeds"
            ],
            "preparationTime": 10,
            "cookingTime": 0,
            "servings": 1,
            "difficulty": "Easy",
            "tags": ["breakfast", "high-protein", "vegetarian"]
        },
        {
            "id": "3",
            "name": "Quinoa Buddha Bowl",
            "calories": 450,
            "ingredients": [
                "1 cup cooked quinoa",
                "1 cup roasted chickpeas",
                "1 cup roasted vegetables",
                "1/2 avocado",
                "2 tbsp tahini dressing"
            ],
            "instructions": [
                "Cook quinoa",
                "Roast chickpeas and vegetables",
                "Assemble bowl",
                "Add dressing"
            ],
            "preparationTime": 20,
            "cookingTime": 30,
            "servings": 1,
            "difficulty": "Medium",
            "tags": ["vegan", "high-fiber", "meal-prep"]
        },
        {
            "id": "4",
            "name": "Greek Yogurt Parfait",
            "calories": 300,
            "ingredients": [
                "1 cup Greek yogurt",
                "1/2 cup granola",
                "1/2 cup mixed berries",
                "1 tbsp honey",
                "1 tbsp chia seeds"
            ],
            "instructions": [
                "Layer yogurt in a glass",
                "Add granola and berries",
                "Drizzle with honey",
                "Top with chia seeds"
            ],
            "preparationTime": 5,
            "cookingTime": 0,
            "servings": 1,
            "difficulty": "Easy",
            "tags": ["breakfast", "high-protein", "quick"]
        },
        {
            "id": "5",
            "name": "Salmon with Roasted Vegetables",
            "calories": 550,
            "ingredients": [
                "6 oz salmon fillet",
                "2 cups mixed vegetables",
                "2 tbsp olive oil",
                "Herbs and spices",
                "Lemon"
            ],
            "instructions": [
                "Preheat oven to 400°F",
                "Season salmon and vegetables",
                "Roast for 20-25 minutes",
                "Serve with lemon"
            ],
            "preparationTime": 15,
            "cookingTime": 25,
            "servings": 1,
            "difficulty": "Medium",
            "tags": ["dinner", "high-protein", "omega-3"]
        }
    ]
    return recipes

@router.get("/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str):
    # In a real application, you would fetch this from a database
    # For now, we'll return a mock recipe
    recipe = {
        "id": recipe_id,
        "name": "Sample Recipe",
        "calories": 400,
        "ingredients": ["ingredient 1", "ingredient 2"],
        "instructions": ["step 1", "step 2"],
        "preparationTime": 20,
        "cookingTime": 30,
        "servings": 2,
        "difficulty": "Medium",
        "tags": ["healthy", "quick"]
    }
    return recipe 