# Express Session, Cookies & CORS

## Express session and cookies
Using express session allows you to create user / server session to identify the client.

### Installation
Install support for session through exectuon of the following command within your project:
```sh
	npm install express-session --save
```

Adding session to your server following example below:

```javascript
	const app = express()
	app.set('trust proxy', 1) // trust first proxy
	app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }
	}))
```

### Options
`express-session` accepts these properties in the options object.

`cookie`
Settings object for the session ID cookie. The default value is `{ path: '/', httpOnly: true, secure: false, maxAge: null }`.

The following are options that can be set in this object.

`cookie.domain`
Specifies the value for the Domain Set-Cookie attribute. By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.

`cookie.expires`
Specifies the Date object to be the value for the Expires Set-Cookie attribute. By default, no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.

Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.

Note The expires option should not be set directly; instead only use the maxAge option.

`cookie.httpOnly`
Specifies the boolean value for the HttpOnly Set-Cookie attribute. When truthy, the HttpOnly attribute is set, otherwise it is not. By default, the HttpOnly attribute is set.

Note be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.

`cookie.maxAge`
Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute. This is done by taking the current server time and adding maxAge milliseconds to the value to calculate an Expires datetime. By default, no maximum age is set.

Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.

`cookie.path`
Specifies the value for the Path Set-Cookie. By default, this is set to '/', which is the root path of the domain.

`cookie.sameSite`
Specifies the boolean or string to be the value for the `SameSite Set-Cookie` attribute.

`true` will set the SameSite attribute to Strict for strict same site enforcement.
`false` will not set the SameSite attribute.
`'lax'` will set the SameSite attribute to Lax for lax same site enforcement.
`'none'` will set the SameSite attribute to None for an explicit cross-site cookie.
`'strict'` will set the SameSite attribute to Strict for strict same site enforcement.

`cookie.secure`
Specifies the boolean value for the Secure Set-Cookie attribute. When truthy, the Secure attribute is set, otherwise it is not. By default, the Secure attribute is not set.

Full details about express-session package can be found [here](https://github.com/expressjs/session)


## CORS

### Installation
Run the following code in your project folder through command prompt / cli
```sh
$ npm install cors
```

### Usage

#### Simple Usage (Enable *All* CORS Requests)

```javascript
	const express = require('express')
	const cors = require('cors')
	const app = express()

	app.use(cors())

	app.get('/products/:id', function (req, res, next) {
		res.json({msg: 'This is CORS-enabled for all origins!'})
	})

	app.listen(80, function () {
		console.log('CORS-enabled web server listening on port 80')
	})
```

#### Enable CORS for a Single Route

```javascript
	const express = require('express')
	const cors = require('cors')
	const app = express()

	app.get('/products/:id', cors(), function (req, res, next) {
		res.json({msg: 'This is CORS-enabled for a Single Route'})
	})

	app.listen(80, function () {
		console.log('CORS-enabled web server listening on port 80')
	})
```

#### Configuring CORS

```javascript
	const express = require('express')
	const cors = require('cors')
	const app = express()

	var corsOptions = {
		origin: 'http://example.com',
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	}

	app.get('/products/:id', cors(corsOptions), function (req, res, next) {
		res.json({msg: 'This is CORS-enabled for only example.com.'})
	})

	app.listen(80, function () {
		console.log('CORS-enabled web server listening on port 80')
	})
```

### Configuration Options

* `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  - `Boolean` - set `origin` to `true` to reflect the [request origin](http://tools.ietf.org/html/draft-abarth-origin-09), as defined by `req.header('Origin')`, or set it to `false` to disable CORS.
  - `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "http://example.com" will be allowed.
  - `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
  - `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", /\.example2\.com$/]` will accept any request from "http://example1.com" or from a subdomain of "example2.com".
  - `Function` - set `origin` to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (called as `callback(err, origin)`, where `origin` is a non-function value of the `origin` option) as the second.
* `methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.
* `exposedHeaders`: Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.
* `credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.
* `maxAge`: Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`: Pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`.

The default configuration is the equivalent of:

```json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```

Full details about cors library can be found [here](https://github.com/expressjs/cors)



