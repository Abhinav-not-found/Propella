const mongoose = require('mongoose')
const colors = require('colors')

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected'.bgGreen);
  } catch (error) {
    console.log('Error connecting database'.bgRed, error);
    process.exit(1); 
  }
};


module.exports =  connection

