require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const connectDB = require("./db/db.js")

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}!`);
});