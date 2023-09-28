# Schema Mapper

This application serves to map an one object schema to other

Here we can either update a schema in the form of Objects or an normal API which fetches the schema as a response.

Based on the type of Values like `array` and `objects` we have few ways to represent those types.
- For Objects it is represented using `'.'`
- For Arrays it is represented using `'->'`

For Example

Consider a JSON Object
```sh
{
    "zincer": [
        {
            "menu": {
                "hai": {
                    "bun": "Burger"
                }
            }
        },
        {
            "menu": {
                "hai": {
                    "bun": "poppers"
                }
            }
        }
    ],
    "blood": {
        "name": "O Positive",
        "symbol": "o+ve",
        "hospital": {
            "name": "SRS Hospital"
        }
    },
    "name": "Akshay",
    "relation": [
        {
            "name": "Aksha_1"
        },
        {
            "name": "Aksha_2"
        },
        {
            "name": "Aksha_3"
        }
    ]
}
```

Here Schema of the above Object is represented as follows

- `zincer->menu.hai.bun`
- `blood.name`
- `blood.hospital.name`
- `name`
- `relation->name`

Using this Mappings we can transform a schema to other.


### API Editor Looks like

API Editor
![API Editor](/apps/schema-mapper/src/assets/API.png)

JSON Editor
![JSON Editor](/apps/schema-mapper/src/assets/JSON.png)

Mapper
![Mapper](/apps/schema-mapper/src/assets/Mapper.png) 

In the above mapper image you can see 
State is mapped to State and address.city

So the response JSON while using this Mapped Schema will be similar to

```sh
{
    State : "Tamil Nadu"
    address : {
        city : "Tamil Nadu"
    }
}
```

Internally the schema will be mapped as 
```sh
{
    "dbdata": [
        "State",
        "address.city"
    ],
    "uploadData": "State"
}
```

Here `uploadData`  provides the source for the value  whereas the `dbdata` provides where the values provided in the uploadData will be stored

___

In order to get this mapping done we have also exposed an API.

### cURL

```
curl --location 'localhost:4444/api/v1/MappedSchema/build' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInVzZXJuYW1lIjoia2giLCJlbWFpbF9pZCI6ImtoQGdtYWlsLmNvbSIsImlhdCI6MTY5MDQ0MjI2NiwiZXhwIjoxNjkwNTI4NjY2fQ.yYrcJkomUgHr5ch9dzFjG1_0Gkrc2kdOChTNnl9HN-o' \
--data '{
    "payload": {
        "json": {
            "zincer": [
                {
                    "menu": {
                        "hai": {
                            "bun": "Burger"
                        }
                    }
                },
                {
                    "menu": {
                        "hai": {
                            "bun": "poppers"
                        }
                    }
                }
            ],
            "blood": {
                "name": "O Positive",
                "symbol": "o+ve",
                "hospital": {
                    "name": "SRS Hospital"
                }
            },
            "name": "Akshay",
            "relation": [
                {
                    "name": "Aksha_1"
                },
                {
                    "name": "Aksha_2"
                },
                {
                    "name": "Aksha_3"
                }
            ]
        },
        "schema": [
            {
                "dbdata": [
                    "bloodRelation->relationship->metta->mottu",
                    "bloodRelation->name",
                    "bloodRelation->sale.person",
                    "bloodySweet->peru"
                ],
                "uploadData": "relation->name"
            },
            {
                "dbdata": [
                    "email_id",
                    "address.city",
                    "hobby.name->city",
                    "address.town.pin"
                ],
                "uploadData": "name"
            },
            {
                "dbdata": [
                    "blood"
                ],
                "uploadData": "blood.hospital.name"
            },
            {
                "dbdata": [
                    "zincer"
                ],
                "uploadData": "zincer->menu.hai.bun"
            }
        ]
    }
}'
```

### Payload

- `json` - Value to be Mapped
- `schema` - Schema used to mapped the given JSON to new JSON

```sh
{
    payload: {
        "json" : {},
        "schema" : [
            {
                "dbdata": [
                    "",
                    ""
                ],
                "uploadData": ""
            }
        ]
    }
}
```

In the payload if you don't know the schema then if you have the uuid then that also works

```sh
{
    payload: {
        "json" : {},
        "schema" : "7fab889f-4ea4-4651-a312-334ed2fb4c9a"
    }
}
```

## Authors

- [@Venkateshwar-DR](https://github.com/Venkateshwar-DR)

(Kindly update it if you contributed to this setup)

## Feedback

If you have any feedback, please reach out to the authors

## Contributing

Contributions are always welcome!