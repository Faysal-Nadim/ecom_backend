const express = require("express");
const { createAddress, getAddress } = require("../controllers/address");
const { requireSignIn, userMiddleware } = require("../middleware");
const router = express.Router();

router.post(
  "/user/address/create",
  requireSignIn,
  userMiddleware,
  createAddress
);
router.get("/user/address/get", requireSignIn, userMiddleware, getAddress);

module.exports = router;
