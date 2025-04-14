from fastapi import APIRouter

router = APIRouter(
    prefix="/meal_plans",
    tags=["meal_plans"]
)

@router.get("/")
def get_meal_plans():
    return {"message": "List of meal_plans"}
