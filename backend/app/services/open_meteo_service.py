import requests


def get_city_coordinates(city_name: str):
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={city_name}&count=5&language=he&format=json"
    
    response = requests.get(url)
    data = response.json()

    results = data.get("results", [])

    coordinates = [
                    {
                        "id": city["id"],
                        "name": city["name"],
                        "latitude": city["latitude"],
                        "longitude": city["longitude"]
                    }
                    for city in results
                ]
    
    return coordinates


def get_weather_data(lat: float, lon: float):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto"
    respons = requests.get(url)
    return respons.json()


def get_compiration_data(city_a: str, city_b:str):
    res_city_a = get_city_coordinates(city_a)
    res_city_b = get_city_coordinates(city_b)
    
    return [res_city_a, res_city_b]





