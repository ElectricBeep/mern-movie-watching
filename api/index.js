const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
const listsRoute = require("./routes/lists");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MONGODB")
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/lists", listsRoute);

app.get("/", (req, res) => {
    res.send("APP IS RUNNING!");
});

app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is running!");
});