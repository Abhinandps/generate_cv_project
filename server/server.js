const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
