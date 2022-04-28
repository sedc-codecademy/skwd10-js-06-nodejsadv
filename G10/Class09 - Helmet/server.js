const express = require("express");
const helmet = require('helmet');

const app = express();

// app.use(helmet.hidePoweredBy())

// //Flameguard
// /**
//  * Helps us to mitigate clickjacking attacks
//  * it won't let somebody to use our site on iframes
//  * so our website can only be iframed from same origin
//  */
// app.use(helmet.frameguard({action: 'DENY'}))

// //internet explorer specific
// //it prevents IE to open unsecure html files
// app.use(helmet.ieNoOpen());

// app.use(helmet.noSniff());

// //helps us mitigate XSS attacks
// app.use(helmet.xssFilter())

// /**
//  * 
//  */
// app.use(helmet.dnsPrefetchControl({allow: false}))

app.use(helmet())

app.get('/', (req, res) => {
  res.send('<h1>Hello from Helmet!</h1>')
})

app.listen(3000, () => {
  console.log('Server is up and running')
})