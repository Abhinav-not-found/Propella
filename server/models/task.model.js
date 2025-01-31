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
  },
  priority:{
    type:String,
    required:[true,'This field is require.'],
    enum:['High','Mid','Low'],
    default:'Low'
  },
  date:{
    type:Date,
    required:[true,'This field is require.'],
    default:''
  }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
