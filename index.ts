import express from "express";
import productRouters from "./routers/products.routers";

const app = express();
app.use(express.json());

app.use("/api/products", productRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
