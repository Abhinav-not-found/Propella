const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const JWT = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'This field is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true,'This field is required.'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true,'This field is required.'],
    select: false,
  },
  yearlyGoals:{
    type:[String],
  }
}, {timestamps: true});

userSchema.statics.hashPassword = async(password)=>{
  return bcrypt.hash(password,10)
}

userSchema.methods.isValidPassword = async function (password) {
  if (!this.password) {
    throw new Error('Password is not loaded in the document.');
  }
  return bcrypt.compare(password, this.password);
};


userSchema.methods.generateJWT = async()=>{
  return jwt.sign({email:this.email},JWT,{expiresIn:'24h'})
}
const User = mongoose.model('User', userSchema);
module.exports = User;
