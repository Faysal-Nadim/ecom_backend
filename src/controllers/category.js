const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  Category.findOne({ slug: req.body.slug }).exec((error, cat) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (cat) {
      return res.status(409).json({ msg: "Slug Already Exists!", cat });
    } else {
      const { category, slug, categoryImg } = req.body;
      const _category = new Category({
        category,
        slug,
        categoryImg,
        createdBy: req.user._id,
      });
      _category.save((err, category) => {
        if (err) {
          return res.status(400).json({ msg: "Something Went Wrong!", err });
        }
        if (category) {
          return res
            .status(201)
            .json({ msg: "Category Created Successfully", category });
        }
      });
    }
  });
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    }
    if (categories) {
      return res.status(200).json({ categories });
    }
  });
};
