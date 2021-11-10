var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQCCHv5sfIOEYf+4TNLfoUIre5GcpJGxb2t1c/TWOvFjE2x1VMwJ
bGzurdeeUss+PcItjuTNixOGNx7YO+HLZkLoW6WXlv9LWtHnbZvpzTZCTrfDxA4B
n/w3NEFp3tiu+CV8QRphvU1kYTbUo4+3Ko9eVNtt/BfLxsSpqQUaraunxQIDAQAB
AoGBAIBZnDNcusnpdLnRpawLP97uW5p8xm2UbxYDFD4BFDvbW/98bmrZNbZVajt0
haBWgOQ5cD3DcrXQRy+aGcZtj45ytqn2XgXpEiklq24cPflNB+1/BDxqylNT/CJf
wpi0vAKRqZRumF66mpeXy++3aaoLrIEcwyXRLU7HOCHf2wC9AkEA+1srhI5TXtCP
3TuN/vTksESYS4mJzKwi4sfbjEqq4ZyKwIsgHWhiJIVqxVl7OgSBgOkb/Fxcgu58
gn8rZyRw+wJBAISGbDnye3mPQkh6iylnheGTkrjv8nglB10TeKlE2fmhoR4cdfz4
JokN3XIWYZAj9TZ6teo4TUg8XNoEwJD4bj8CQQCcw+3OTJ3+ooE3b69N9hqzPPTn
F67T8gAIBLIPO3p8H5ACKkMrVDDxqiw/TWGne6vxZHHJ4SjpmCgbk4jUWUwFAkAk
UEk7n6wh5RV+ksWrNMjExRFBR86jCVJ5OKqph0pLUvS5MYdLKBw3FeuGJYfaXWAF
654JbiAPGStAOmkh0FE1AkEA8xkuzjVyHhsMG8kni0+h4iVyGc5GKZfvHQ23wzoN
I6lRcdmQQMSrPMfNne1bxtOSFdbZhNosi5uoHZcGKYeBWQ==
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
    // res.send("Valid Request");
    return await bcrypt
      .compare(
        req.body.password,
        "$2b$10$BuqyTDS8zV5Skgt/r6XTpeAnXhkkqpk.0u6T2728ffh6EZdPMrslS"
      )
      .then((result) => {
        if (result === true) {
          const token = jwt.sign({ id: "pretend_user_id" }, privateKey, {
            algorithm: "RS256",
          });
          return res.status(200).json({ access_token: token });
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  } else res.status(400).json({ error: "Username or Password missing" });
});
router.post("/register", function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      res.json({
        password: req.body.password,
        hashedPassword: req.hashedPassword,
      });
    } else
      res
        .status(400)
        .json({ error: "Password and confirm password does not match" });
  } else res.status(400).json({ error: "Username or Password or confirm password missing" });
});

module.exports = router;
