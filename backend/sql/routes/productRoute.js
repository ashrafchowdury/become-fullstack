const express = require("express");
const {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController.js");
const router = express.Router();

router.get("/all-products", getAllProducts);
router.post("/add-product", addNewProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
