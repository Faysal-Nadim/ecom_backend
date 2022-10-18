const Product = require("../models/product");

exports.createProduct = (req, res) => {
  const {
    title,
    image,
    price,
    productID,
    stock,
    gallery,
    ratings,
    variations,
    specification,
    weight,
    category,
    description,
    currency,
    order_count,
    shipping,
  } = req.body;
  const _product = new Product({
    title,
    image,
    price,
    productID,
    stock,
    gallery,
    ratings,
    variations,
    specification,
    weight,
    category,
    description,
    currency,
    order_count,
    shipping,
  });
  _product.save((error, product) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (product) {
      return res.status(201).json({ product });
    }
  });
};

exports.getProductById = (req, res) => {
  Product.findOne({ productID: req.body.productID }).exec((error, product) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (product) {
      return res.status(200).json({ product });
    }
  });
};

exports.getProductByCategory = (req, res) => {
  Product.find({ category: req.body.category }).exec((error, products) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (products) {
      return res.status(200).json({ products });
    } else {
      return res.status(404).json({ msg: "No Product Found!" });
    }
  });
};
