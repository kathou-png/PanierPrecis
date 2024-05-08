import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import invoices from "./routes/invoices";
import users from "./routes/users";
import login from "./routes/login";
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(users);
app.use(login);
app.use(invoices);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
