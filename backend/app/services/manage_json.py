import json


def read_json():
    with open('./data/favorites.json','r',encoding='utf-8') as favorites:
        return json.load(favorites)
         

def write_json(data):
    with open('./data/favorites.json','w',encoding='utf-8') as favorites:
        json.dump(data, favorites, indent=4)
        




