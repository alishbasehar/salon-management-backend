
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");

app.use(express.json());
app.use("/api/products", productsRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
