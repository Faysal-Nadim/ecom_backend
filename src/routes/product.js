const express = require("express");
const { createProduct, getProductById } = require("../controllers/product");
const router = express.Router();

router.post("/admin/product/create", createProduct);
router.post("/product/get/id", getProductById);

module.exports = router;
