# WELCOME TO WORKSHOP PART 2!

- You will continue to work on top of the code from the first workshop.

## Requirements:

### 1. Implement full authencication

      - Following the MVC pattern, create /register and /login routes.
      - For the register route, when registering new user, validate the data using JOI and encrypt user's password.

### 2. Implement JWT authentication mechanism for authenticating the user.

      - If you previously implemented the authentication mechanism using session, remove the session and implement the JWT auth mechanism.
      - If there is no auth mechanism implement yet (no session), continue with JWT.

### 3. Protect all routes, so only authenticated user can access them

### 4. Add user and admin roles with JWT ( Optional )

      - Refactor routes validations, instead of using the session to check if user is admin or user, use JWT.
      **REMINDER
      - Endpoints that should be available to users:
      - GET All dishes
      - GET Dish by id
      - POST Order (validate that one only one order is recieved in the body with a middleware)

      - Endpoints available to admins:
      - All Dish Endpoints
      - All Order Endpoints

### 5. Implement UI
