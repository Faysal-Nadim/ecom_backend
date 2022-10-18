const express = require("express");
const {
  signup,
  signin,
  signout,
  verifyEmail,
  sendVerificationCode,
} = require("../controllers/user");
const { uploads3, requireSignIn } = require("../middleware");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "665178446094-ci8tq3phvuv23bju5gij3q3imjuujopk.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return profile;
    }
  )
);

router.post("/user/signup", uploads3.single("profilePicture"), signup);
router.post("/user/signin", signin);
router.post("/user/verification/email", sendVerificationCode);
router.post("/user/verification/email/verify", verifyEmail);
router.get(
  "/user/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  //   passport.authenticate("google"),
  function (req, res) {
    res.send("Logged In");
  }
);
router.post("/user/signout", requireSignIn, signout);

module.exports = router;
