from fastapi import APIRouter

router = APIRouter(
    prefix="/nutrition",
    tags=["nutrition"]
)

@router.get("/")
def get_nutrition():
    return {"message": "nutrition facts"}
