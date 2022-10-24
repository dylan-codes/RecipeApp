const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8080;

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler)

app.listen(PORT, console.log(`Server started on port ${PORT}`));
