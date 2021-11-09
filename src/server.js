import "./load_env";
import express from "express";
import routes from "./routes";
import cors from "cors";
import "./redis_config";

const app = express();
const PORT = process.env.PORT || 5000;

//Parsing incoming requests JSON payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//App Routes
routes(app);

//Listening to PORT
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});
