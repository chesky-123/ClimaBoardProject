from pydantic import BaseModel, Field

class FavoriteRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=20)
    city: str = Field(..., min_length=2, max_length=30)
    
    