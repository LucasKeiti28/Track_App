const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Enable the application handle JSON data.
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://lucas:teste123@cluster0-ax3gp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance.");
});
mongoose.connection.on("error", () => {
  console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => {
  res.send("Hi, There!!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
