# Server-side rendering with EJS

## What is SSR?
**Server-side rendering (SSR)** is a popular technique for rendering a normally client-side only single page app (SPA) on the server and then sending a fully rendered page to the client. The client’s JavaScript bundle can then take over and the SPA can operate as normal. 
SSR technique is helpful in situations like the client has a slow internet connection and then rendering of the whole page on client-side takes too much time in certain situations Server Side Rendering might come as handy. One of the widely used modules used to do Server Side Rendering in Node.js is EJS Module. EJS stands for **Embedded JavaScript template**.

## Features if EJS module
* Use plain javascript.
* Fast Development time.
* Simple syntax.
* Faster execution.
* Easy Debugging.
* Active Development.


## Installation of request module:  

1. First of all install express js and ejs using npm install. You also can visit this link to know more about EJS. 

`npm install ejs`

2. The require() method is used to load and cache JavaScript modules. 

`const ejs = require('ejs');`

3. Next step is to create a folder and add a file name app.js and a file named index.ejs. Be careful, about syntax of index file, here it is ejs which denotes it is an ejs file. To run this file You need the following command. 

`node app.js`

Render file using EJS renderFIle() method 
To perform Server Side Rendering we use renderFile() method of the ejs module, which helps us to render the ejs file on the server-side.

Syntax:  

`ejs.renderFile( fileName, { }, { }, callback);`

Here, callback function takes two arguments first is an error (if there is an error occurs then the renderFile returns an error) and on successful rendering it returns a template.

Filename: app.js 

```javascript
// Requiring modules
const express = require('express');
const app = express();
const ejs = require('ejs');
var fs = require('fs');
const port = 8000;

// Render index.ejs file
app.get('/', function (req, res) {

	// Render page using renderFile method
	ejs.renderFile('index.ejs', {},
		{}, function (err, template) {
		if (err) {
			throw err;
		} else {
			res.end(template);
		}
	});
});

// Server setup
app.listen(port, function (error) {
	if (error)
		throw error;
	else
		console.log("Server is running");
});
```

Filename: index.ejs 
```
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content=
		"width=device-width, initial-scale=1.0">
</head>

<body>
	<h1>Hello World</h1>
</body>

</html>
```

## Steps to run the program:
1. Make sure you have installed the express and request module using the following commands: 

`npm install express`
`npm install ejs`

2. Run app.js using the below command: 

`node app.js`