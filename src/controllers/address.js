const Address = require("../models/address");

exports.createAddress = (req, res) => {
  const {
    recipient_name,
    recipient_phone,
    recipient_city,
    recipient_zone,
    recipient_area,
    recipient_address,
    isDefault,
  } = req.body;
  const _address = new Address({
    user: req.user._id,
    recipient_name,
    recipient_phone,
    recipient_city,
    recipient_zone,
    recipient_area,
    recipient_address,
    isDefault,
  });
  _address.save((error, address) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (address) {
      return res.status(201).json({ msg: "New Address Created!", address });
    }
  });
};

exports.getAddress = (req, res) => {
  Address.find({ user: req.user._id }).exec((error, addresses) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (addresses) {
      return res.status(200).json({ addresses });
    }
  });
};
