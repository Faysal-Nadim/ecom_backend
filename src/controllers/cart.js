const Cart = require("../models/cart");

exports.addToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      return res.status(404).json({ msg: "Something Went Wrong!", error });
    }
    if (cart) {
      const product_id = req.body.cartItems.product;
      const sku = req.body.cartItems.props.sku;
      const product = cart.cartItems.find(
        (c) => c.product == product_id && c.props.sku == sku
      );
      let condition, updated;
      if (product) {
        condition = {
          user: req.user._id,
          "cartItems.product": product_id,
          "cartItems.props.sku": sku,
        };
        updated = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              qty: product.qty + +req.body.cartItems.qty,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        updated = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(condition, updated, { new: true }).exec(
        (err, cart) => {
          if (err) {
            return res.status(400).json({ msg: "Something Went Wrong!", err });
          }
          if (cart) {
            return res
              .status(201)
              .json({ msg: "Your Cart Has Been Updated!", cart });
          }
        }
      );
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error)
          return res.status(400).json({ error, msg: "Something Went Wrong!" });
        if (cart) {
          return res
            .status(201)
            .json({ cart, msg: "Item Added To Your Cart!" });
        }
      });
    }
  });
};

exports.getCart = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .populate({ path: "cartItems.product" })
    .exec((error, cart) => {
      if (cart) {
        return res.status(200).json({ cart });
      }
      if (error) {
        return res.status(400).json({ msg: "Something Went Wrong!", error });
      }
    });
};

exports.removeCart = (req, res) => {
  Cart.updateOne(
    { user: req.user._id },
    {
      $pull: {
        cartItems: {
          _id: req.body._id,
        },
      },
    }
  ).exec((error, result) => {
    if (error)
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    if (result) {
      res.status(201).json({ msg: "Item Removed From Your Cart!", result });
    }
  });
};
