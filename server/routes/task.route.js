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

module.exports = router;
