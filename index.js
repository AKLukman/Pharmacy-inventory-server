const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const toolRoute = require("./routes/v1/tools.route.js");
const pharmacyRoute = require("./routes/v1/pharmacy.route.js");
const errorHandle = require("./middleware/errorHandle");
const { connectToServer } = require("./utils/dbConnect");

app.use(cors());
app.use(express.json());

// file
app.use(express.static("Public"));
app.set("view engine", "ejs");

// Apply the rate limiting middleware to all requests
// app.use(limiter);

// Application level middleware
// app.use(viewCount);

// Database Connection
connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else {
    console.log(err);
  }
});

// Base URL Pharmacy route
app.use("/api/v1/pharmacy", pharmacyRoute);

app.get("/", (req, res) => {
  res.render("home.ejs", {
    id: 2,
    user: {
      name: "Test",
    },
  });
});

app.all("*", (req, res) => {
  res.send("No Route found");
});

app.use(errorHandle);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit();
  });
});
