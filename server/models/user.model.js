const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  // role: {
  //   type: String,
  //   default: 'user',
  // },
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
  return jwt.sign({email:this.email},process.env.JWT_SECRET,{expiresIn:'24h'})
}
const User = mongoose.model('User', userSchema);
module.exports = User;
