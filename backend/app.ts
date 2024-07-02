import express from "express";
import routes from "./routes/routes";
import invoices from "./routes/invoices";
import users from "./routes/users";
import login from "./routes/login";
import items from "./routes/items";
import categories from "./routes/categories";
import groceryStore from "./routes/groceryStore";
import products from "./routes/products";
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(routes);
app.use(users);
app.use(login);
app.use(products);
app.use(invoices);
app.use(items);
app.use(categories);
app.use(groceryStore);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
