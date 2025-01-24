const jwt = require('jsonwebtoken')
const authMiddleware = async (req, res, next) =>{
  try {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    if(!token){
      return res.status(401).send('UnAuthorized User')
    }
    
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).send({error:'Please Authenticate'})
  }
}

module.exports = authMiddleware
