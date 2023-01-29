import "core-js/stable";
import "regenerator-runtime/runtime";
import "./load_env";
import path from "path";
import express from "express";
import routes from "./routes";
import cors from "cors";
import "./redis_config";

const app = express();
const PORT = process.env.PORT || 8080;

//Parsing incoming requests JSON payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "frontend/build/index.html"));
});

//App Routes
routes(app);

//Listening to PORT
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});
