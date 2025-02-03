const express = require('express');
const router = express.Router();

const taskModel = require('../models/task.model');

router.get('/', (req, res) => {
  res.send('Hello tasks');
});

router.post('/create', async (req, res, next) => {
  try {
    const { task,priority,date } = req.body;
    // const adjustedDate = new Date(new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000);
    const formattedDate = date.split('T')[0];

    const newTask = new taskModel({ task,priority:priority||'Low',date });
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

router.put('/updateChecked/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isChecked } = req.body; 
    console.log(isChecked)

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { checked: isChecked },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Send the updated task back as a response
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
});

router.put('/updateTask/:id',async(req,res,next)=>{
  try {
    const {id}=req.params
    const {updatedText,priority,date} =req.body
    const findTask = await taskModel.findByIdAndUpdate(id,{task:updatedText,priority:priority,date:date},{new:true})
    if(findTask){
      return res.status(200).json({message:'Updated Successfully'})
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;
