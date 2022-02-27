const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRouter);
app.use('/api/user', userRouter);
app.get('/health',(req, res) => res.status(200).send('life assistant service'));

module.exports = app;
