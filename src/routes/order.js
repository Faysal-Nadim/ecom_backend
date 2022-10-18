const express = require("express");
const { placeOrder, getOrders } = require("../controllers/order");
const { requireSignIn, userMiddleware } = require("../middleware");
const router = express.Router();

router.post("/user/order/place", requireSignIn, userMiddleware, placeOrder);
router.get("/user/order/get", requireSignIn, userMiddleware, getOrders);

module.exports = router;
