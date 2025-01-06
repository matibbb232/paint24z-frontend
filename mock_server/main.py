from fastapi import FastAPI, Response
import random

app = FastAPI()


def generate_products(n: int=5):
    NAMES = ["RJ45 - Mały", 
             "RJ45 - Średni", 
             "RJ45 - Duży",
             "Rezystor 1k",
             "Rezystor 4k7",
             "Rezystor 47k"]
    return [{
        "id": str(i),
        "name": random.choice(NAMES),
        "description": "jakieś tam ...gadanie o chopinie",
        "price": random.random() * 250,
        "composition": 1,
        "weight": random.random(),
        "category": {
            "name": "Kabelki",
            "description": "opis"
        },
        "manufacturer": { "name": "Januszex SA" }
    } for i in range(n)]


@app.get("/products")
async def products(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return generate_products(20)