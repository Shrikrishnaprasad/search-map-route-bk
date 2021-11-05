const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const mapRoute = require("./routes/map");

dotenv.config();
app.use(express.json());
app.use(cors());
//db config
// .connect("mongodb://localhost:27017/map-route")
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGODB Connected successfully"))
  .catch((err) => console.log(err));

app.use("/map", mapRoute);
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
