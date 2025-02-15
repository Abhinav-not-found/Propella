const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const connection = require('./database/db')
const cookieParser = require('cookie-parser')

const sendResponse = require('./utils/responseHelper')

const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors({
  origin: ['https://propella-psi.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.options('*', cors());
app.use(cookieParser())

app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://propella-psi.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(204);
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://propella-psi.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


dotenv.config();
connection()

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const userRoutes = require('./routes/user.route')
app.use('/api/users/',userRoutes)

const taskRoutes = require('./routes/task.route')
app.use('/api/tasks/',taskRoutes)

app.use((err,req,res,next)=>{
  console.log(err)
  return sendResponse(res,500,'error','Internal Server Error',null,err)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan);
});
