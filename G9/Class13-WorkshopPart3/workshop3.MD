## Workshop #3 - e-Restaurant with Mongo/Mongoose

### Requirements

1. Create a dish model in mongoose and implement all CRUD operations for it.
2. Create an order model in mongoose and implement all CRUD operations for it.
3. When creating an order update the orders property in the specified dish.(add the order to the orders property)
4. When getting order/dish by id populate the dish/orders properties respectfully.
5. All orders start with the status "new" when they are created.
6. Add the specific endpoints that we defined in the first workshop

### Bonus (Optional)

Don't attempt the bonus part until after you have finished all the basic requirements

1. Create an authentication server with mongo that will allow users to register and login
2. Add a user property to the orders so that we can know which user made the order (should be a reference to a User document)
3. Add authorization with JWT and add Roles (You as owners can change the role level directly in the database)
4. Implement the specific guards that we already defined in workshop 1

**Guidelines**

- You can start a brand-new project, it's not mandatory to continue working from the second workshop.
- It is expected from you to already have a working mongo atlas database before starting the project ( ask us for help if something is wrong with setup/connection)
- Validation should remain the same as we had in the previous workshops but done in mongoose
- If a requirement seems too complex at first, try deconstructing it in smaller problems and tackle those smaller problems one at a time
- Work in incremental steps: write some code > test until code is working > repeat.
- Model definitions for requirements:

```
Dish {
    id: string;
    name: string;
    price: number;
    description: string;
    orders: ObjectId array (ref to Order documents)
}
```

```
Order {
    id: string
    dish: ObjectId (ref to dish document)
    status: string (new,cancelled,done)
}
```

```
User {
    email: string (valid email)
    password: hashed string (min 8 chars)
    age: number - (>=13)
    role: (user,admin)
    username: string
}

```
