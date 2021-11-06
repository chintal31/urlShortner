const express = require("express");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

//Parsing incoming requests JSON payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//App Routes
require("./routes.js")(app);

//PORT
app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
