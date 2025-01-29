from fastapi import FastAPI, Response, HTTPException
import random
import json

app = FastAPI()

products_num = 20
products_arr = []
products_generated = False
last_used_id = ""


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
            "instock": round(random.random() * 300),
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
    global last_used_id
    for product in products_arr:
        if product["id"] == item_id:
            last_used_id = item_id
            return product
    raise HTTPException(status_code=501, detail="Item not found") 

@app.get("/productCat/{category_name}")
async def get_products(response: Response, category_name: str):
    response.headers["Access-Control-Allow-Origin"] = "*"
    result_arr = []
    global last_used_id
    for product in products_arr:
        if product["category"]["name"] == category_name:
            if product["id"] != last_used_id:
                result_arr.append(product)
    if not result_arr:
        raise HTTPException(status_code=501, detail="Item not found") 
    return json.dumps(result_arr)

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

@app.get("/manufacturers")
async def manufacturers(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return [{
        "id": "19",
        "name": "JanuszexSA"
    }, {
        "id": "139",
        "name": "GoWin Sp. z o.o."
    }]

@app.get("/orders")
async def orders(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return [
        {
            'id': round(random.random() * 2137),
            'amount': random.random() * 250,
            'status': 'In progress',
            'order_date': '21.12.2024',
            'shipping_date': '19.01.2025',
            'history': '???',
            'client': random.random() * 2138,
        }
    ]

@app.get('/about')
async def about(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return {
        'store': {
            'name': 'POwurShop',
            'email_address': 'powurshop.store@o2.pl',
            'phone_number': '+4952192390',
            'tax_id': '022-41-11-111',
        },
        'addresses': [
            {
                'country': 'Poland',
                'city': 'Warsaw',
                'street': 'Noakowskiego',
                'building_number': '15',
                'apartment_number': '3',
                'postal_code': '01-234',
            },
            {
                'country': 'Poland',
                'city': 'Warsaw',
                'street': 'Chmielna',
                'building_number': '3',
                'apartment_number': None,
                'postal_code': '54-321',
            },
        ]
    }