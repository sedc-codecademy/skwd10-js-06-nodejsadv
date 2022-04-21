# Securing API communication 🚓
Securing API applications can be tricky. Unlike MVC applications where there is more control of what the user sees and can interact with, web APIs have no knowledge of what or where the client is or what is planning to do with our data. This is why the communication between the client and server should be made secure. 
## Authentication and Authorization 🔸
Authentication and Authorization are key principles in securing any application. They have different meaning and they happen in a different point in the security cycle. 
* Authentication - The process where we identify and verify a user or process that is trying to access the application. We always do authentication before authorization. 
* Authorization - The process where we give permission to the user or process on what and where they can access in the application. This process is done after authentication because we need to know who the user is before we can grant them access to features of our application.
## Securing API applications 🔸
Securing API applications is done through implementing security measures on the application it self as well as on the requests that are used for communication with the client. There should also be focus on the client experience and usability. There are multiple systems for managing security as well as accessibility to the client. Some of the most used ones are: 
* Session based
* Token based
### Sessions ( Stateful ) 🔽
Working with sessions is one way of authenticating a source of requests and keeping that connection secure. This method works by the server creating sessions for every client that requests something from it. These sessions are kept on the server machine. Every time a client requests for something, they are authenticated and then they are given a cookie with a session id which represents their session id on the server along with a signature unique to the server called a secret that makes the cookie authentic and serves as a protection from the client changing the cookie. This method works as follows:
1. User submits login credentials ( username, pass )
2. Server verifies those from the DB
3. Server creates a temporary user session
4. Server issues a cookie with a session ID
5. User sends the cookie with each request
6. Server validates it agains the stored session and grants access
7. When user logs out it destroys the session and clears the cookie

This system is also called stateful because we keep sessions on the server as well as keep data on the client ( id ).
### Tokens ( Stateless ) 🔽
Tokens are another way to secure a communication between client and server. This system involves a special string called token to be passed to the client on successful authentication. This token then can be passed with every request to get authenticated with the server. Tokens are not kept by the server. They usually carry data with them as well as a signature and a secret that only the server knows. All of these information are transformed in to a string, some parts are encrypted and it is given to the client. This way everything needed is in the cookie and the server does not need to keep data on it's side. The cookie is the data and the key to authorizing requests. The flow of this system goes:
1. User submits login credentials ( username, pass )
2. Server verifies those from the DB
3. Server generates a temporary token and embeds user data into it
4. Server responds back with the token
5. Client stores it ( local storage )
6. User sends the token with each request
7. Server verifies the token and grants access
8. On Log-out the token is cleared from client storage

Communication secured by token is usually called stateless and self-contained. This means that the server does not keep any data on the state of the client. It also means that all necessary data is on the token it self. 
![stateles and statefull authorization](https://cdn.auth0.com/blog/cookies-vs-tokens/cookie-token-auth.png)
## JWT bearer token 🔸
A JWT or JSON Web Token is a json that follows certain rules, is digitally signed and is used for securely exchanging information between client and server. JWT Tokens can be signed digitally by a secret which only the server knows or with public/private key pairs. The JWT token has a defined structure consisting of 3 parts:
* Header - Data about the token it self ( Encoded in Base64Url )
	* alg - Algorithm used for signing hash ( "SHA256" )
	* typ - Type of cookie ( "JWT" )
* Payload - Statements for our business logic called claims ( Encoded in Base64Url )
	* iss - issuer of the token ( Who is issuing the token )
	* exp - what time does the token expire
	* sub - subject of the token ( Some data that is important for the business logic )
	* aud - audience of the token ( Who is the token meant for ) 
* Signature - a unique signature hashed with the encryption written in the header. The input data that is hashed is the header, payload and a secret ( a string that only the server knows )
 ![jwt token](https://cask.scotch.io/2014/11/json-web-token-overview1.png)
### Hashing 🔽
The process of converting an input from a different length to a fixed set of numbers or text of same length ( by mathematical algorithm ). This process creates a string that is totally different from the string it started. This makes the string useless, unless compared with a hash that came from the same string. Hashing is used for various purposes, mostly for verification of things such as addresses, passwords, file names etc. The hashing process goes like this:
1. **Input**: a string of any length is selected
2. **Hash Method**: A method that executes a mathematical algorithm is selected that will convert the string in to a fixed set of string characters or numbers ( MD5, SHA256 etc. )
3. **Hash**: The hash method returns a new string or set of numbers that is called hash

### How do JWT tokens work 🔽
When a Client requests something from a server the server validates the request ( Ex: username and password ) After that the server creates a token by adding the header, adding some claims about the user that is relevant for when the token is returned back ( Ex: Username and UserId ). Then it combines them with the secret and creates a hash with the preferred algorithm. It combines everything and creates the JWT string. The token is returned to the client. The client decides how to keep the token. On every other call, the client will just give the token to the server. The token will validate the token to see if it has been changed or tampered. If it is valid it will allow the client request. The token can be invalidated by trying to change it or if the token is expired. 
![jwt communication](https://miro.medium.com/max/875/1*SSXUQJ1dWjiUrDoKaaiGLA.png)

## OAuth 2.0 🔸
The number of devices and services that we use is growing and every device and service requires authorization. This is why authorization frameworks such as OAuth 2.0 exist. With it our application or service can obtain a limited access to a user account that is enough to authenticate it from another system such as facebook, google, github etc. This is the framework that gives the option to sign in with a facebook/google account instead of creating an accout or logging in. In order for an application to have access this type of authorization from another system it needs to be registered on that system. After registering the system gives the application a unique ID and a secret that will identify that application when making requests. The flow of OAuth authentication usually goes like this: 
1. A user click to authorize through another service ( ex: google )
2. Google will show an authorization screen to enter username/password ( usually this is an authorization API )
3. When the user enters the correct data it grants permission to the application and the application gets an access token
4. The application then requests the user data that the user agreed to share ( usually a different resource API )
5. The server validates the access token and gives the application the requested data
6. The application then authorizes the user ( ex: with their google account )
![oauth2](https://assets.digitalocean.com/articles/oauth/abstract_flow.png)

## Extra Materials 📘
* [Understand JWT in 5 steps](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)
* [Cookies vs Tokens guide](https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide)
* [Good article about JWT](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
* [Introduction to OAuth2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
* [JWT Decoder](https://jwt.io/)
