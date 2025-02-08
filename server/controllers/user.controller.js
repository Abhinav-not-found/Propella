const userService = require('../services/user.service')
const userModel = require('../models/user.model')
const sendResponse = require('../utils/responseHelper')

const register = async (req, res, next) => {
  try {
    const {email,name,password}=req.body
  if(!email && !name && !password){
    return sendResponse(res, 400, 'error', 'This field is required', null, null)
  }
    const findEmail = await userModel.findOne({email:email})
    if(findEmail){
      return sendResponse(res, 409, 'error', 'Email Already Exist!', null, null)
    }
    else{
      const user = await userService.createUser(req.body)
      delete user._doc.password
      return sendResponse(res, 201, 'success', 'User Created Successfully!', user, null)
    }
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {

    const { email, password } = req.body
    
    if(!email && !password){
      return sendResponse(res, 400, 'error', 'This field is required', null, null)
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      sendResponse(res, 401, 'error', 'Invalid Credentials', null, null)
    }

    const isMatch = await user.isValidPassword(password)
    if (!isMatch) {
      sendResponse(res, 401, 'error', 'Invalid Credentials', null, null)
    }

    const token = await user.generateJWT();
    delete user._doc.password
    sendResponse(res, 200, 'success', 'Login Successful!', { user, token }, null)

  } catch (error) {
    next(error)
  }
}
const profile = async (req, res, next) => {
  try {
    console.log(req.user)
    res.status(200).json({
      user: req.user
    })
  } catch (error) {
    next(error)
  }
}
const getUserInfo = async (req,res,next)=>{
  try {
    const {id} = req.params
    console.log(id)
    const findUser = await userModel.findById(id)
    if(findUser){
      res.status(200).json({message:'User Found', data:findUser})
    }
    else{
      res.send('User Not found')
    }
  } catch (error) {
    next(error)
  }
}

const getAllUsers = async(req,res,next)=>{
  try {
    const getAllUsers = await userModel.find()
    if(getAllUsers){
      res.status(200).json(getAllUsers);
    }
  } catch (error) {
    next(error)
  }
}

// yearly goals
const addYearlyGoals = async (req,res,next)=>{
  try {
    const {id}=req.params
    const {yearlyInput}=req.body
    const findUser = await userModel.findByIdAndUpdate(id)
    if(findUser){
      findUser.yearlyGoals.push(yearlyInput)
      await findUser.save()
      res.status(200).json({message:'Added Successfully',data:findUser})
    }
    else{
      res.send('User Not Found')
    }
  } catch (error) {
    next(error)
  }
}
const getYearlyGoals = async(req,res,next)=>{
  try {
    const {id} = req.params
    const findUser = await userModel.findById(id)
    if(findUser){
      res.status(200).json({data:findUser.yearlyGoals})
    }
  } catch (error) {
    next(error)
  }
}
const deleteYearlyGoal=async(req,res,next)=>{
  const { userId } = req.params;
  const { goalText } = req.body;
  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { yearlyGoals: goalText } }
    );
    res.status(200).send({ message: 'Goal deleted successfully' });
  }
  catch (error) {
    next(error)
  }
}
module.exports = { register, login, profile,getUserInfo, addYearlyGoals, getYearlyGoals, deleteYearlyGoal, getAllUsers }

