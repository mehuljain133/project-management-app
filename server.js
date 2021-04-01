const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();


app.use(cors());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Project Management Application" });
});

// set port, listen for requests
const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./api/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database succesfully!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
    
require("./api/routes/project.routes.js")(app);
const authRoutes = require("./api/routes/auth.js");
app.use('/api/user', authRoutes)
