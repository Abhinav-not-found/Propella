const mongoose = require('mongoose')
const colors = require('colors')

const connection = () =>{
  mongoose.connect(process.env.DB)
.then(()=>console.log('Database Connected'.bgGreen))
.catch((error)=>console.log('Error connecting database'.bgRed ,error))
}


module.exports =  connection

