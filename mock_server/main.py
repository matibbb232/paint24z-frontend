from fastapi import FastAPI, Response, HTTPException
import random

app = FastAPI()

products_num = 20
products_arr = []
products_generated = False


def generate_products(n: int=5):
    NAMES = ["RJ45 - Mały", 
             "RJ45 - Średni", 
             "RJ45 - Duży",
             "Rezystor 1k",
             "Rezystor 4k7",
             "Rezystor 47k"]
    global products_arr
    for i in range(n):
        products_arr.append({
            "id": str(i),
            "name": random.choice(NAMES),
            "description": "jakieś tam... gadanie o chopinie",
            "price": random.random() * 250,
            "composition": 1,
            "weight": random.random(),
            "category": {
                "name": "Kabelki",
                "description": "opis"
            },
            "manufacturer": { "name": "Januszex SA" }
        })


@app.get("/products")
async def products(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    global products_generated, products_arr
    if not products_generated:
        generate_products(products_num)
        products_generated = True
    return products_arr

@app.get("/product/{item_id}")
async def get_item(response: Response, item_id: str):
    response.headers["Access-Control-Allow-Origin"] = "*"
    for product in products_arr:
        if product["id"] == item_id:
            return product
    raise HTTPException(status_code=501, detail="Item not found") 


@app.get("/categories")
async def categories(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return [{
        "id": "1",
        "name": "kabelki",
        "description": "opis"
    },{
        "id": "2",
        "name": "przewody",
        "description": "opis ale v2"
    }]
