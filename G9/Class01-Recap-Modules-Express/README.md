# Retrospective from Node basic
Retrospective from nodejs basic classes, core points that should be revised and confirmed

## Modules

### What is a Module in Node.js?

Consider modules to be the same as JavaScript libraries.
A set of functions you want to include in your application.

### Built-in Modules

Node.js has a set of built-in modules which you can use without any further installation.
Look at [Built-in Modules Reference](https://www.w3schools.com/nodejs/ref_modules.asp) for a complete list of modules.

### Include Modules

To include a module, use the `require()`.
Example for including a module:

```javascript 
	const fs = require('fs')

	//Using FS methods within code
	fs.writeFile(fileName, data, (error, result) => {
		if(error)
		throw Error(error);

		return `Completed`
	});
```

### Create Your Own Modules

To create a new module, simply create a new file example: mymodule.js, then within the file:

```javascript

	const myFunction = () => {
		return Date.now();
	}

	module.exports = myFunction; //This is to export only one function
	//or
	module.exports = {myFunction, myFunction2, ...} //This is to export multiple functions from the same file

```

## File System

The Node.js file system module allows you to work with the file system on your computer.
Nodejs FS module (API) offers various of methods to manipulate filesystem on your computer, some of most used:

### Read file
Allows you to read files from specific path (location)

```javascript
	const fs = require('fs');

	fs.readFile(filepath, function(err, data) { //filepath = full path to the file, including the filename 
		if(err)
		throw new Error(err)

		console.log(data.toString()) //Using toString to convert binary data to human understandable text
	});
```

### Write file
Allows you to write new file to specific path (location), if file doesn't exist - it will be auto created.

```javascript

	const fs = require('fs');

	fs.writeFile(filepath, 'Hello content!', function (err) { //filepath = full path to file, including filename e.g 'mynewfile3.txt'
		if (err) throw err;
		console.log('Saved!');
	});
```

### Append file
Allows you to update file content, where old content stays and new content is added at the end of the file.

```javascript
	const fs = require('fs');

	fs.appendFile(filepath, 'Hello content!', function (err) { //filepath = full path to file, including filename e.g 'mynewfile3.txt'
		if (err) throw err;
		console.log('Saved!');
	});
```

### Delete file
Allows you to delete file from specific path (location)

```javascript
	const fs = require('fs');

	fs.unlink(filepath, function (err) { //filepath = full path to file, including filename e.g 'mynewfile3.txt'
		if (err) throw err;
		console.log('File deleted!');
	});
```

## Express
Fast, unopinionated, minimalist web framework for Node.js

### Installation
To install express as part of your project, navigate to your project location and execute following command:

```bash
	npm install express --save
```

### First Hellow world application
Example code to create mini web server using express.
[Express Guidlines](https://expressjs.com/en/guide/routing.html) [Express API Documentation](https://expressjs.com/en/4x/api.html)

```javascript
	const express = require('express')
	const app = express()
	const port = 3000

	app.get('/', (req, res) => {
		res.send('Hello World!')
	})

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
```