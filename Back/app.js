const express = require("express");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const cors = require("cors");

const productRoute = require("./routes/productRoute");

const mongoose = require("mongoose");
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://danattali:f4Ze6FhjNNAloDU5@dancluster.mfhakte.mongodb.net/ChicCharms?retryWrites=true&w=majority&appName=DanCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
