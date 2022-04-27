## Create store app

# Requirements

### 1.Make a users_db where you will have list of user objects. Each user should have the following properties:

# {

# username: string

# password: string

# email: string

# isPremiumUser: boolean

# }

### 2.Make store_db where you will have list of products ( of your choice ), but products should have following properties:

# {

# productName: string

# productId: string

# price: string

# isPremiumProduct: boolean

# }

### 3.Make a LOGIN route, following the JWT authentication mechanism

### 4.Make a get route for the store (example: '/get_products')

### 5.Make sure that only authenticated users can request the get route '/get_products'

### 5.5 -> - If a looged in user that is not premium (which means isPremiumUser is false), theese users can only see the products that are not premium which means (isPremiumProduct is false). The premium users can see all the products =).

### BONUS: Create a post route for "/add_product", which will add a new product to the database, and only the premium users will be allowed to request this route.
