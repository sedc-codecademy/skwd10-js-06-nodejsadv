# Middlewares / MVC / Express routes retrospective
Retrospective to Middlewares, MVC code pattern and Express routes

## Middlewares

### What are middlewares?
Middleware functions are functions that have access to the request object ( req ), the response object ( res ), and the next middleware function in the application's request-response cycle.

### Attaching middlewares to Express

Example of error handling middleware
```javascript
	app.use((err, req, res, next) => { //This middleware will be executed on every request to express server
		console.error(err.stack)
		res.status(500).send('Something broke!')
	})
```

Example code how to attach middleware(s) to existing express route

```javascript
	const logOriginalUrl => (req, res, next) {
		console.log('Request URL:', req.originalUrl)
		next()
	}

	const logMethod => (req, res, next) {
		console.log('Request Type:', req.method)
		next()
	}

	const logStuff = [logOriginalUrl, logMethod]; //Array of middlewares that needs to execute before request body is executed

	app.get('/user/:id', logStuff, (req, res, next) => {
		res.send('User Info')
	})
```

More about middlewares that can be attached to express can be found at: [Middlewares](https://expressjs.com/en/guide/using-middleware.html)

## Express Routes

### What is route?
A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern.

Example of express route:
```javascript
	app.get('/', function (req, res) {
		res.send('Wiki home page');
	})
```

Create express router module, allows you to better structure the code and to isolate features/functionalities in separate folders/files organized per entity/feature etc.

Example of express router file:

```javascript

	//Router file wiki.js
	const express = require('express');
	const router = express.Router();

	// Home page route.
	router.get('/', function (req, res) {
		res.send('Wiki home page');
	})

	// About page route.
	router.get('/about', function (req, res) {
		res.send('About this wiki');
	})

	module.exports = router;

	//Main app/server file
	const wiki = require('./wiki.js');
	// ...
	app.use('/wiki', wiki);
```

Full details about core behind express routes can be found [here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

## MVC pattern

### What is Model-View-Controller?
MVC is simply a design or architectural pattern used in software engineering. While this isn’t a hard rule, but this pattern helps developers focus on a particular aspect of their application, one step at a time.

The main goal of MVC is to split large applications into specific sections that have their own individual purpose.

### Model
As the name implies, a model is a design or structure. In the case of MVC, the model determines how a database is structured, defining a section of the application that interacts with the database. This is where we will define the properties of a user that will be store in our database.

The controller accesses the database through the model. You could say that the model is the heart of the application.

# View
The view is where end users interact within the application. Simply put, this is where all the HTML template files go.

# Controller
The controller interacts with the model and serves the response and functionality to the view. When an end user makes a request, it’s sent to the controller which interacts with the database.

You can think of the controller as a waiter in a restaurant that handles customers’ orders, which in this case is the view. The waiter then goes to the kitchen, which is the model/database, and gets food to serve the customers, which is the controller handling the request.

