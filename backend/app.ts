import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
