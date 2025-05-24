require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // allow cookies and credentials
  })
);
app.use(express.json()); // Middleware to parse json
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello user");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT : ${process.env.PORT}`);
});
