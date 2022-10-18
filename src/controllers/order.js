const Order = require("../models/order");

exports.placeOrder = async (req, res) => {
  console.log(req.body);
  const D = new Date();
  const {
    invoice,
    orderTotal,
    totalProduct,
    shipping,
    coupon,
    address,
    weight,
  } = req.body;
  const _order = new Order({
    user: req.user._id,
    orderID: `${Math.floor(100000 + Math.random() * 900000)}`,
    orderTime: D.toDateString(),
    invoice,
    transaction: {
      method: req.body.payment,
    },
    orderItems: req.body.orderItems,
    orderTotal,
    totalProduct,
    shipping,
    coupon,
    address,
    tracking: {
      time: D.toLocaleString(),
      remark: "Your Order Has Been Placed!",
    },
    weight,
  });
  await _order.save((error, order) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (order) {
      return res.status(201).json({ order });
    }
  });
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .populate({ path: "address" })
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({ msg: "Something Went Wrong!", error });
      }
      if (orders) {
        return res.status(200).json({ orders });
      } else {
        return res.status(404).json({ msg: "Order Not Found!" });
      }
    });
};
