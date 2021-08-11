const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users/users");
const authRoute = require("./routes/users/auth");

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/socialmedia/", (req, res) => {
    res.send("Welcome to the App!");
})

app.use("/socialmedia/users", userRoute);
app.use("/socialmedia/auth", authRoute);

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('Connected to the Database');
});

app.listen(7700, () => {
    console.log('WELCOME!!');
});
