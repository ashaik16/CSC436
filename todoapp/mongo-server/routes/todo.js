var express = require("express");
var router = express.Router();
var Todo = require("../models/Todo");
var jwt = require("jsonwebtoken");
/* GET home page. */
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
  console.log(req.header("Authorization"));
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
});

router.post("/", function (req, res, next) {
  //res.render('index', { title: 'Express' });
  const todo = new Todo({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
    completed: req.body.completed,
    dateCompleted: req.body.dateCompleted,
    authorId: req.payload.id,
  });

  todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        id: savedTodo._id,
        title: savedTodo.title,
        author: savedTodo.author,
        description: savedTodo.description,
        dateCreated: savedTodo.dateCreated,
        completed: savedTodo.completed,
        dateCompleted: savedTodo.dateCompleted,
        authorId: savedTodo.authorId,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

module.exports = router;
