const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const path = require("path");

const port = process.env.PORT || 3002;
const mongo_url = process.env.mongo_uri;

app.use(express.json());
app.use(cookieParser());

app.use("/api/product", productRouter);
app.use("/api/auth", userRouter);
app.use("/api/order", orderRouter);

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Could not connect to MongDB because...");
  }
};

connectDB();
