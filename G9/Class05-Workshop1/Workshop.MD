# Create an MVC structured eRestaurant application - part 01

1.  Create a dish resource and implement all the crud operations for it

- The price should be validated when updating or adding a dish, no prices above 1000 or below 1

```
   Dish {
   id: string,
   name: string,
   price: number,
   }

```

2.  Create an order resource and implemented all crud operations for it

- Add a special patch endpoint that will only PATCH the status of an order (ex:PATCH orders/:id/status)

```
    Order: {
    id: string,
    dishName: string,
    status: string (new, cancelled, done)
    }

```

- OPTIONAL BONUS
  When creating a new order check if the dishName exists in the dishes resource (think importing one model in another)

3.  Create auth model/controller that will allow users to log in (use express-session for auth)

```
User: {
    id: string,
    username: string,
    password: string,
    role: string (user, admin)
}
```

4.  Endpoints that should be available to users:

- GET All dishes
- GET Dish by id
- POST Order (validate that one only one order is recieved in the body with a middleware)

5.  Endpoints available to admins:

- All Dish Endpoints
- All Order Endpoints

Guidelines:

- Everything above should be implemented using the MVC pattern (choose your own style of syntax).
- Finish one step before moving on to the next, the goal of this workshop is for you to do as much as you can in 3 hours, not to finish all the requirements, no rush.
- Test every endpoint in postman before moving on to the next, do not type them out in a batch.
- It is okay to reference and use code already implemented in class (ex: data.service.js).
- There is no need to create a frontend to consume these endpoints, focus on building the api.
- You shouldn't have extremely precise error handling but it should be implemented in a basic way for all endpoints.
