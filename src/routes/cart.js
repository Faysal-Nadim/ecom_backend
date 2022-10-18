const express = require("express");
const { addToCart, getCart, removeCart } = require("../controllers/cart");
const { requireSignIn, userMiddleware } = require("../middleware");
const router = express.Router();

router.get("/user/cart", requireSignIn, userMiddleware, getCart);
router.post("/user/cart/create", requireSignIn, userMiddleware, addToCart);
router.post("/user/cart/remove", requireSignIn, userMiddleware, removeCart);

module.exports = router;
