# Simple Money Converter

It is simply a currency converter.
![Banner](resources/index.png "Banner")

# Usage
Example of simple conversion without date:

**request** ``GET``  `api/convert/COP/USD/4000/`

**response** ``application/json`` 
```json
{
    "COP": 4000,
    "USD": 1.01
}
```

# Installation
Just clone de repository or download [here](#).

Once cloned/downloaded duplicate the .env.example file as .env and set:

``APP_FREE_API_KEY``: 4d8403db04106c231548

Run the following commands from the console in the project folder:

1. ``npm i``
2. ``npm run dev``

And that's it, you can already consume the api.

# API
Access the API without authentication, you will have the following endpoints:

``GET``  `api/convert/{from}/{to}/{amount}/{?date}`
An endpoint that will make you a simple conversion

---
``POST``  `api/multi-convert`
An endpoint that will do a multiple conversion, the body must have the following format:

```json
{
    "requests": [
        {
            "from": string,
            "to": string,
            "amount": number,
            "date": string
        },
        {
            "from": string,
            "to": string,
            "amount": number,
            "date": string
        },
        {
            "from": string,
            "to": string,
            "amount": number,
            "date": string
        },
        ...
    ]
}
```

**NOTE:** The endpoint only allows a size of 100 items for the key ``"request"``

---
The parameters for both enpoints comply with the following:

|Param|Description|Required|
|-------------|:-------------:| -----:|
|from|It is the currency from which the conversion will be made|yes|
|to|It is the currency to which the conversion will be made|yes|
|amount|It is the amount to convert|yes|
|date|It is the date of the conversion rate that must be used, if it is not sent, the current date will be used|no|
