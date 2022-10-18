const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

//Initialize Server
const app = express();

//Routes
const userRoute = require("../src/routes/user");
const productRoute = require("../src/routes/product");
const cartRoute = require("../src/routes/cart");
const categoryRoute = require("../src/routes/category");
const orderRoute = require("../src/routes/order");
const addressRoute = require("../src/routes/address");
const pathaoRoute = require("../src/routes/pathao");

//Initialize Environment Variable
env.config();

//Initialize Database Connection
mongoose
  .connect(
    `mongodb+srv://faysal:${process.env.DB_PASS}@aleeha.j2nq0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Server Configarations
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", addressRoute);
app.use("/api/v1", pathaoRoute);

//PORT Config
app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
