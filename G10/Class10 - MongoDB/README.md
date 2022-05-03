
--DOCUMENTATION ABOUT QUERIES

https://www.mongodb.com/docs/manual/reference/operator/query/



--COMMANDS--

db  - check on which database we are placed

use "name of database" - checkout to specific database, but if that database doesm't exists mongosh will create it automatically for us (use our-first-mongo-app)

db.users.find() - retreive all data from users

db.users.find({firstName: "Goce"}) - retreive data from users by parameter

db.users.find({firstName: "Ivan", lastName: "Jamandilovski"}) - retreive data from users by two parameters at once

db.users.insertOne({firstName:"Bob", lastName:"Bobsky",age:28}) - inserts One user 

db.users.find({age:{$lt: 30}}) -- finds all users with age less than 30 

db.users.find({$or: [{firstName:"Goce"},{age:{$gte:25}}]}) - finds user that contains firstName:"Goce" or every user that has age greater than 25