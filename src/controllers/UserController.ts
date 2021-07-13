import express from "express";
import bcrypt from "bcryptjs";
import User from "@models/User";

const router = express.Router();

router.get("/users/signup", (req, res) => {
  res.render("users/signup", { user: req.session.user });
});

router.post("/users/create", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  User.findOne({ where: { email: email } }).then((user) => {
    if (user == undefined) {
      User.create({
        email: email,
        password: hash,
        balance: 0,
      }).then(() => {
        res.redirect("/users/login");
      });
    } else {
      res.redirect("/users/signup");
    }
  });
});

router.get("/users/login", (req, res) => {
  res.render("users/login", { user: req.session.user });
});

router.post("/authenticate", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ where: { email: email } }).then((user: any) => {
    if (user != undefined) {
      var correct = bcrypt.compareSync(password, user.password);
      if (correct) {
        req.session;
        req.session.user = {
          id: user.id,
          email: user.email,
        };
        res.redirect("/");
      } else {
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/login");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

export default router;
