const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      original: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      discount_type: {
        type: String,
        required: true,
      },
      discounted: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    productID: {
      type: Number,
      required: true,
      unique: true,
    },
    stock: {
      qty: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    gallery: [
      {
        img: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: [
      {
        user: {
          type: String,
        },
        rating: {
          type: Number,
        },
        feedBack: {
          type: String,
        },
        img: {
          type: String,
        },
        date: {
          type: String,
        },
      },
    ],
    variations: {
      var_name: {
        type: String,
      },
      skus: [
        {
          value: {
            type: String,
          },
          img: {
            type: String,
            default: null,
          },
          stock: {
            type: Number,
          },
          sku: {
            type: String,
            unique: true,
          },
        },
      ],
    },
    specification: [
      {
        key: {
          type: String,
        },
        value: {
          type: String,
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: "BDT",
    },
    order_count: {
      type: Number,
      default: 0,
    },
    shipping: [
      {
        provider: {
          type: String,
        },
        time: {
          type: String,
        },
      },
    ],
    service: {
      type: String,
      default: "N/A",
    },
    seller_info: {
      store_id: {
        type: Number,
        default: null,
      },
      store_name: {
        type: String,
        default: null,
      },
    },
    brand: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
