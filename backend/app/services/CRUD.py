from services.manage_json import read_json, write_json
from middleware.logger_conpig import logger

def get_favorites():
    logger.info('get all favorites')
    data = read_json()
    logger.info("read succful")
    return data



def create_favorite(name, city):
    logger.info('user ask to create new favorite')
    favorites = get_favorites()
    
    for f in favorites:
        if "name" in f and "favorites" in f:
            if f["name"] == name:
                logger.info('user exists')
                if city not in f["favorites"]:
                    f["favorites"].append(city)
                    write_json(favorites)
                    logger.info('favorite created')
                    return True
                logger.error('favorite exists')
                return False
                
    logger.info('user not exists, creating new user')
    new_user = {
        "name": name,
        "favorites": [city]
    }
    favorites.append(new_user)
    write_json(favorites)
    return True

def delete_favorite(name,city):
    favorites = get_favorites()
    for f in favorites:
        if f["name"] == name:
            if city in f["favorites"]:
                f["favorites"].remove(city)
                write_json(f["favorites"])
                return True
    return

def get_user_favorites(name):
    favorites = get_favorites()
    for f in favorites:
        if "name" in f and f["name"] == name:
            return f["favorites"]
    return [] 



