const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true,'This field is required.'],
  },
  checked:{
    type:Boolean,
    required:[true,'This field is require.'],
    default:false
  }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
