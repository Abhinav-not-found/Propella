const userService = require('../services/user.service')
const userModel = require('../models/user.model')
const sendResponse = require('../utils/responseHelper')

const register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body)
    delete user._doc.password
    return sendResponse(res, 201, 'success', 'User Created Successfully!', { user }, null)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {

    const { email, password } = req.body
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
module.exports = { register, login, profile }

