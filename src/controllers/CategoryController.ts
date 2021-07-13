import express from "express";
import slugify from "slugify";
import Category from "@models/Category";

const router = express.Router();

router.get("/categories/new", (req, res) => {
  if (!req.session.user) res.redirect("/");
  res.render("categories/new", { user: req.session.user });
});

router.post("/categories/save", (req, res) => {
  if (!req.session.user) res.redirect("/");
  var title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/categories");
    });
  } else {
    res.redirect("/categories/new");
  }
});

router.get("/categories", (req, res) => {
  if (!req.session.user) res.redirect("/");
  Category.findAll().then((categories) => {
    res.render("categories", {
      categories: categories,
      user: req.session.user,
    });
  });
});

router.post("/categories/delete", (req, res) => {
  if (!req.session.user) res.redirect("/");
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/categories");
      });
    } else {
      res.redirect("/categories");
    }
  } else {
    res.redirect("/categories");
  }
});

router.get("/categories/edit/:id", (req, res) => {
  if (!req.session.user) res.redirect("/");
  const id = req.params.id;
  if (typeof id === "string" && !Number.isNaN(Number(id))) {
    res.redirect("/categories");
  }
  Category.findByPk(id)
    .then((category) => {
      if (category != undefined) {
        res.render("categories/edit", { category: category });
      } else {
        res.redirect("/categories");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/categories/update", (req, res) => {
  if (!req.session.user) res.redirect("/");
  var id = req.body.id;
  var title = req.body.title;
  Category.update(
    { title: title, slug: slugify(title) },
    { where: { id: id } }
  ).then(() => {
    res.redirect("/categories");
  });
});

export default router;
