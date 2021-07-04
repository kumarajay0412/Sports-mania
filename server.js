require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const cors = require("cors");
const mysqlDriver = require('mysql');
const authRouter = require("./routes/authRouter");
const tableRouter = require("./routes/tableRouter");
const courseRouter = require("./routes/courseRouter");
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

const dbConnection = mysqlDriver.createConnection({
    host: process.env.AWS_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port:process.env.DB_PORT
})

dbConnection.connect((err)=>{
    if(err){
        console.error(err.message);
    }
    console.log("Connected to the Database");
})

app.use("/api/auth", authRouter);
app.use("/api/table",tableRouter);
app.use("/api/course",courseRouter);
app.use(errorHandler());
app.listen(PORT, () => {
	console.log(`Listening at port ${PORT}`);
});
module.exports = app;