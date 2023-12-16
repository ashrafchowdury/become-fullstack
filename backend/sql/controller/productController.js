const pool = require("../database/postgresql.js");
const { v4: uuid } = require("uuid");

const getAllProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.status(200).json(products.rows);
  } catch (error) {
    console.log("Get All Products:", error);
    res.status(500).json({ error: "Get All Products: Something went wrong!" });
  }
};

const addNewProduct = async (req, res) => {
  const { title, description, image, price } = req.body;
  try {
    const uid = uuid();
    const addProduct = await pool.query(
      `INSERT INTO products (id, title, description, image, price)  VALUES ($1, $2, $3, $4, $5)`,
      [uid, title, description, image, price]
    );
    res.status(200).json(addProduct.command);
  } catch (error) {
    console.log("Add New Products:", error);
    res.status(500).json({ error: "Add New Products: Something went wrong!" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price } = req.body;
  try {
    const update = await pool.query(
      `UPDATE products SET title = $1, description = $2, image = $3, price = $4 WHERE id = $5;`,
      [title, description, image, price, id]
    );
    res.status(200).json(update);
  } catch (error) {
    console.log("Uodate Products", error);
    res.status(500).json({ error: "Update Product: Something went wrong!" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const remove = await pool.query(`DELETE FROM products WHERE id = $1;`, [
      id,
    ]);
    res.status(200).json(remove);
  } catch (error) {
    console.log("Delete Products", error);
    res.status(500).json({ error: "Delete Product: Something went wrong!" });
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
