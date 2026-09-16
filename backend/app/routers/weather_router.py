from fastapi import APIRouter
from services.open_meteo_service import get_city_coordinates, get_weather_data, get_compiration_data
from services.CRUD import create_favorite, get_user_favorites
from schemas.weather_schemas import FavoriteRequest




router = APIRouter(prefix="/api")



@router.get("/search")
def search_city(name:str):
    return get_city_coordinates(name)

@router.get("/weater")
def get_weater(lat:float, lon:float):
    return get_weather_data(lat, lon)


@router.get("/compiration")
def get_compiration(city_a:str, city_b:str):
    return get_compiration_data(city_a, city_b)


@router.post("/favorites/add")
def add_favorite(request: FavoriteRequest):
    if create_favorite(request.name, request.city):
        return { "create" : True }
    return { "create" : False }
 
@router.get("/favorites")
def get_favorites_list(name:str):
    favs = get_user_favorites(name)
    return { "favorites": favs }






