var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const saltRounds = 10;
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFJgUdq1oq8AQ99hF3VK8yGKOaohqeMEbfd8yQb+ck5Pnuo9vGui
xX/b7yC4S/1Ibo3WS07Z9mw0wz2Yf5M61LrY4AmKGg+3YZiNEsull18zWdGO5LeA
SLw7rPRmx+jydmkUgC2quzveBb/cjLOSANDlfxTF6wHRKlcneousUnPdAgMBAAEC
gYAl8xnCmEsKNCUQk7oq3wyDNxq5tih93VyL14EFJ9OhIC0l3KshKyuxa7EOcdkQ
Jn5H+aFYAjH0R5pqlgav3TqDEwtR3h3EKI918/CaYCrF024O7Zu2hETOlRyUrrrh
XZItqkvu8VpcFpzGhWFSL7mBWuZaJa13PUWRRusteieSAQJBAKNf+HUGt4cEWKCn
vpjU2fSkV/Re6KXLunD7FBK+4W4Vxrq3Tz9GaVoMjZbpQGpU64hkuz7nPZm4d0v3
c+xZ0DkCQQCBFE6YIZHtuNYTbyKdMxJaFI5lqKOTkztdhoQdoyTif73rrcsK62pR
Bhved24gYdBMWcxVbrJaeTZxC4jZbvjFAkAX8u6SAR0QLsPrMQvQjYsxwJGgIfWK
sFWxUCz+HnsfTxPltQ9p4CF7cNGkqKanr7EjOlj0fKNcEF10hl646+WJAkANBtWf
uNOXYC4KrA6cOslBWg286LYJcLRvDeJLc2mHikjKfjGdmoCSSMGLRBZTIkv5SJ68
iH1rcAw0gGuBNhfZAkAg19YesD1aC1IES+PPLkKJwNdjZTbxVVZAf7VUOCapovMJ
oyQpTHFizOs0m80LRHwwmxitW+IhiHJjk4wOKZjY
-----END RSA PRIVATE KEY-----
`;
router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();

    // res.send("Valid Request");
    if (user) {
      return await bcrypt
        .compare(
          req.body.password,
          user.password
          // "$2b$10$BuqyTDS8zV5Skgt/r6XTpeAnXhkkqpk.0u6T2728ffh6EZdPMrslS"
        )
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({ access_token: token });
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    } else {
      return res.status(401).json({ error: "User is not registered" });
    }
  } else res.status(400).json({ error: "Username or Password missing" });
});
router.post("/register", function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      user
        .save()
        .then((savedUser) => {
          //  if (savedUser === true) {
          const token = jwt.sign({ id: user._id }, privateKey, {
            algorithm: "RS256",
          });
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
            access_token: token,
          });
          // }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });

      // res.json({
      //   password: req.body.password,
      //   hashedPassword: req.hashedPassword,
      // });
    } else
      res
        .status(400)
        .json({ error: "Password and confirm password does not match" });
  } else res.status(400).json({ error: "Username or Password or confirm password missing" });
});

module.exports = router;
