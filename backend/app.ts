import { GroceryStore } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import invoices from "./routes/invoices";
import users from "./routes/users";
import login from "./routes/login";
import items from "./routes/items";
import categories from "./routes/categories";
import groceryStore from "./routes/groceryStore";
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(users);
app.use(login);
app.use(invoices);
app.use(items);
app.use(categories);
app.use(groceryStore);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
