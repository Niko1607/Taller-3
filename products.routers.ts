import express from "express";
import { Product } from "../models/product.model";

const router = express.Router();

// Simulamos una base de datos en memoria
let products: Product[] = [
  { id: 1, name: "Teclado mecánico", price: 120000, Stock: 5 },
  { id: 2, name: "Mouse gamer", price: 80000, Stock: 10 },
];

// GET - Obtener todos los productos
router.get("/", (req, res) => {
  res.json(products);
});

// GET - Obtener un producto por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

// POST - Crear un nuevo producto
router.post("/", (req, res) => {
  const { name, price, stock } = req.body;

  // validación
  if (!name || !price || stock === undefined) {
    return res.status(400).json({ message: "Faltan datos del producto" });
  }

  const newProduct: Product = {
    id: products.length + 1,
    name,
    price,
    Stock: stock,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT - Actualizar un producto existente
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price, stock } = req.body;
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Producto no encontrado" });

  products[index] = { ...products[index], name, price, Stock: stock };
  res.json(products[index]);
});

// DELETE - Eliminar un producto
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Producto eliminado correctamente" });
});

export default router;