# Products API

## Example GET request
GET http://localhost:3000/api/products

Response:
[
  {
    "id": "1a2b3c",
    "name": "Sample Product",
    "price": 19.99
  }
]

## Example POST request
POST http://localhost:3000/api/products
Body:
{
  "name": "New Product",
  "price": 29.99
}

Response:
{
  "id": "4d5e6f",
  "name": "New Product",
  "price": 29.99
}
