const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  // #1 here we will ask for client's acess token
  const token = req.header("Authorization")
  if(!token){
    return res.status(401).send({message: "Access denied"})
  }
  console.log(token)

  // you shall not pass
  // #2 we will validate it
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    /**
     * This err, will be triggered if the validation of the TOKEN FAILS
     * It means, token has expired or random data was send as a token (ehhehehehe)
     */
    if(err){
      return res.status(403).send({message: "You are not allowed to get this data"})
    }
    console.log(user);
    //Here on the req object, we add new property .user with the value of user =)
    req.user = user
    // #3 if valid we proceed
    next()
  })

 
}

module.exports = {auth}