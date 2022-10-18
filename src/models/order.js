const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderID: {
      type: String,
      required: true,
      unique: true,
    },
    orderTime: {
      type: String,
      required: true,
    },
    invoice: {
      status: {
        type: String,
        enum: ["Paid", "Unpaid", "Partially Paid", "In Dispute", "Refunded"],
        default: "Unpaid",
      },
      amount: {
        type: Number,
        required: true,
      },
      paid: {
        type: Number,
        default: 0,
      },
    },

    transaction: {
      trxID: {
        type: String,
        default: null,
      },
      method: {
        type: String,
        default: null,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },

    orderItems: [
      {
        productID: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        props: {
          name: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
          sku: {
            type: String,
            required: true,
          },
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        itemTotal: {
          type: Number,
          required: true,
        },
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
    },
    totalProduct: {
      type: Number,
      required: true,
    },
    shipping: {
      status: {
        type: String,
        default: null,
      },
      provider: {
        type: String,
        default: null,
      },
      delivery_time: {
        type: String,
        default: null,
      },
      delivery_fee: {
        type: Number,
        default: null,
      },
      consignment_id: {
        type: String,
        default: null,
      },
    },
    coupon: {
      coupon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        default: null,
      },
      coupon_type: {
        type: String,
        default: null,
      },
      discounted_amount: {
        type: Number,
        default: null,
      },
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    tracking: [
      {
        status: {
          type: String,
          enum: [
            "Pending",
            "Processing",
            "Shipped",
            "In Transit",
            "Delivered",
            "Cancelled",
            "Returned",
          ],
          default: "Pending",
        },
        time: {
          type: String,
          required: true,
        },
        remark: {
          type: String,
          default: null,
        },
      },
    ],
    weight: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        default: "KG",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
