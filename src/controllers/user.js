const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ses = require("node-ses");

exports.signup = async (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(409).json({ msg: "This Email Already Exists" });
    }
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong", error });
    } else {
      const { firstName, lastName, email, password, phone, role, gender } =
        req.body;
      //   console.log(req.body);
      //   let profilePicture = {};
      //   if (req.file) {
      //     profilePicture = { img: req.file.location, key: req.file.key };
      //   }
      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
        gender,
        // profilePicture,
      });
      _user.save((error, user) => {
        if (user) {
          return res.status(201).json({ msg: "Signup Successful", user });
        } else if (error) {
          return res.status(400).json({ msg: "Something Went Wrong", error });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error)
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    if (user) {
      if (
        user.authenticate(req.body.password) &&
        user.role === "user" &&
        user.verification.verified === true
      ) {
        const token = jwt.sign(
          { _id: user._id, role: user.role, verification: user.verification },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        const {
          firstName,
          lastName,
          fullName,
          email,
          password,
          phone,
          role,
          gender,
          profilePicture,
          verification,
        } = user;
        return res.status(200).json({
          msg: "Login Success",
          token,
          user: {
            firstName,
            lastName,
            fullName,
            email,
            password,
            phone,
            role,
            gender,
            profilePicture,
            verification,
            // code: Math.floor(100000 + Math.random() * 900000),
          },
        });
      }
      if (
        user.authenticate(req.body.password) &&
        user.role === "user" &&
        user.verification.verified === false
      ) {
        return res.status(403).json({
          msg: "Please Verify Your Email To Continue!",
        });
      } else {
        return res.status(401).json({
          msg: "Invalid Credentials!",
        });
      }
    } else {
      return res.status(404).json({
        msg: "User Not Found",
      });
    }
  });
};

exports.sendVerificationCode = (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        "verification.code": Math.floor(1000 + Math.random() * 9000),
      },
    },
    { new: true }
  ).exec((error, data) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong" });
    }
    if (data) {
      const sesClient = ses.createClient({
        key: process.env.AWS_ID,
        secret: process.env.AWS_SECRET,
        amazon: `https://email.ap-southeast-1.amazonaws.com`,
      });

      sesClient.sendEmail(
        {
          to: `${req.body.email}`,
          from: "Aleeha Technologies <no-reply@aleehatech.com>",
          subject: "Verification Code From Aleeha Technologies",
          message: `Your Verification Code Is ${data.verification.code}. This code will expire in 120 seconds.`,
        },
        function (err, data) {
          if (err) {
            return res.status(401).json({ err });
          }
          if (data && err === null) {
            return res.status(202).json({ msg: "Verification Code Sent!" });
          }
        }
      );
    }
  });
};

exports.verifyEmail = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong! Try Again." });
    }
    if (user) {
      if (
        user.verification.verified === false &&
        user.verification.code !== null &&
        user.verification.code === req.body.code
      ) {
        User.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              "verification.verified": true,
            },
          },
          { new: true }
        ).exec((err, data) => {
          if (err) {
            return res.status(400).json({ msg: "Email Verification Failed!" });
          }
          if (data) {
            return res
              .status(202)
              .json({ msg: "Verification Success! Please Login Again." });
          }
        });
      }
      if (
        user.verification.verified === false &&
        user.verification.code !== null &&
        user.verification.code !== req.body.code
      ) {
        return res
          .status(401)
          .json({ msg: "Wrong Code. Please Submit Again!" });
      }
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    msg: "Signout Successfully!",
  });
};
