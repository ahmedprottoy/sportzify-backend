const express = require("express");


const blogRouter = require('./src/routes/blog.route');
const userRouter = require('./src/routes/user.route');
const authRouter = require('./src/routes/auth.route');

const app = express();



app.use(express.json());

//cookieParser,cors,morgan

app.use('/api/v1/blogs',blogRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);

module.exports = app;



