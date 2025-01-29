const express = require('express');
const router = express.Router();

const taskModel = require('../models/task.model');

router.get('/', (req, res) => {
  res.send('Hello tasks');
});

router.post('/create', async (req, res, next) => {
  try {
    const { task } = req.body;
    const newTask = new taskModel({ task });
    const saveTask = await newTask.save(); 
    res.status(201).json({message:'Task Created Successfully',data:saveTask})
  } catch (error) {
    next(error);
  }
});

router.get('/getAllTasks',async(req,res,next)=>{
  try {
    const allTasks = await taskModel.find()
    res.status(200).json(allTasks)
  } catch (error) {
    next(error)
  }
})

router.delete('/deleteTask/:id',async(req,res,next)=>{
  try {
    const {id} = req.params
    const deleteTask = await taskModel.findByIdAndDelete(id)
    if(deleteTask){
      res.status(200).json({deleteTask})
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;
