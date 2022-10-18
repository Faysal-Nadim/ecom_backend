const express = require("express");
const {
  getDeliveryCharge,
  getRecipientCity,
  getRecipientZone,
  getRecipientArea,
} = require("../controllers/pathao");

const router = express.Router();

router.post("/courier/pathao/fee", getDeliveryCharge);
router.get("/courier/pathao/get-city", getRecipientCity);
router.post("/courier/pathao/get-zone", getRecipientZone);
router.post("/courier/pathao/get-area", getRecipientArea);

module.exports = router;
