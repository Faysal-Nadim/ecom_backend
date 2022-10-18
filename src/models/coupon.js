const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    coupon_type: {
      type: String,
      required: true,
    },
    validity: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
    isValid: {
      type: Boolean,
      required: true,
      default: true,
    },
    offer: {
      offerAmount: {
        type: Number,
        required: true,
      },
      offerType: {
        type: String,
        required: true,
        enum: ["%", "flat"],
      },
    },
    minAmount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
