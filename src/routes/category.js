const express = require("express");
const { createCategory, getAllCategory } = require("../controllers/category");
const { requireSignIn, userMiddleware } = require("../middleware");
const router = express.Router();

router.post(
  "/admin/category/create",
  requireSignIn,
  userMiddleware,
  createCategory
);
router.get("/category/get/all", getAllCategory);

module.exports = router;
