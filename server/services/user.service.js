const userModel = require('../models/user.model')

const createUser = async({ email, password, name })=>{
  if(!email || !password){
    throw new Error('Email and password are required!')
  }

  const hashedPassword = await userModel.hashPassword(password)

  const user = await userModel.create({
    email,password:hashedPassword,name
  })
  
  return user;
}
module.exports = { createUser }
