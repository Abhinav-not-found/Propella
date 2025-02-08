const express = require('express')
const { register, login, profile, getUserInfo, addYearlyGoals, getYearlyGoals, deleteYearlyGoal,getAllUsers } = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/profile',authMiddleware ,profile)
router.get('/getUserInfo/:id',getUserInfo)

router.get('/getAllUsers', getAllUsers)

// yearly goals
router.post('/addYearlyGoals/:id',addYearlyGoals)
router.get('/getYearlyGoals/:id',getYearlyGoals)
router.delete('/api/users/deleteYearlyGoal/:userId', async (req, res) => {
  const { userId } = req.params;
  const { goalText } = req.body;

  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { yearlyGoals: goalText } } // Remove the goal by text
    );
    res.status(200).send({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete the goal' });
  }
});




module.exports = router 
