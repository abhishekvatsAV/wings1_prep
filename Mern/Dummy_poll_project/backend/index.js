const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const pollRoutes = require("./routes/polls");
const cors = require("cors");

//express app
const app = express();

// middleware & static files
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/poll", pollRoutes);

app.get("/ping", (req, res) => {
  console.log("hi check route");
  return res.send("pong");
});

const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected with DB and Server started on " + PORT);
    });
  })
  .catch((err) => {
    console.log("error : ", err);
  });
