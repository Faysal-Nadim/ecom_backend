const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient_name: {
      type: String,
      required: true,
    },
    recipient_phone: {
      type: String,
      required: true,
    },
    recipient_city: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
    recipient_zone: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
    recipient_area: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
    recipient_address: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
