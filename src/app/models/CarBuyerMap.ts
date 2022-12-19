export interface CarBuyerMap {

  "id": 3,
  "carId": 4,
  "buyerId": 3,
  "buyer": Buyers,
  "car": Cars
}

export interface Cars {
    "id": string,
    "make": string,
    "model": string,
    "year": 0,
    "price": 0,
    "mileage": 0,
    "transmission": string,
    "vin": string,
    "type": string,
    "previousOwners": 0,
    "rank": number,
    "currentPrice": number
  
  }
  export interface Buyers {
    id: string;
    lastName: string;
    firstName: string;
    age: string;
    address: string;
    phone: string;
    city: string;
  }