import express from "express";
import User from "@models/User";
import Transaction from "@models/Transaction";
import Category from "@models/Category";
import { Op } from "sequelize";
import { Parser } from "json2csv";

const router = express.Router();

router.get("/transactions", (req, res) => {
  if (!req.session.user) res.redirect("/");
  Transaction.findAll({
    where: { userId: req.session.user?.id },
    include: [{ model: Category }],
    order: [["id", "DESC"]],
  }).then((transactions) => {
    res.render("transactions", {
      user: req.session.user,
      transactions: transactions,
    });
  });
});

router.get("/transactions/new", (req, res) => {
  if (!req.session.user) res.redirect("/");
  Category.findAll().then((categories) => {
    res.render("transactions/new", {
      user: req.session.user,
      categories: categories,
    });
  });
});

router.post("/search", (req, res) => {
  if (!req.session.user) res.redirect("/");
  if (req.body.start && req.body.end) {
    const startDate = new Date(req.body.start);
    const endDate = new Date(req.body.end);
    endDate.setDate(endDate.getDate() + 1);
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        userId: req.session.user?.id,
      },
      include: [{ model: Category }],
      order: [["id", "DESC"]],
    }).then((transactions) => {
      res.render("transactions", {
        user: req.session.user,
        transactions: transactions,
      });
    });
  }
});

router.post("/export", (req, res) => {
  if (!req.session.user) res.redirect("/");
  if (req.body.start && req.body.end) {
    const startDate = new Date(req.body.start);
    const endDate = new Date(req.body.end);
    endDate.setDate(endDate.getDate() + 1);
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        userId: req.session.user?.id,
      },
      include: [{ model: Category }],
      order: [["id", "DESC"]],
    }).then((transactions) => {
      let data: any = [];
      transactions.forEach((transaction) => {
        let row = [
          transaction.getDataValue("to"),
          transaction.getDataValue("value"),
          transaction.getDataValue("comment"),
          transaction.getDataValue("createdAt"),
          transaction.getDataValue("categoryId"),
        ];
        row.join(",");
        data.push(row);
      });
      data.join("\n");
      const json2csv = new Parser();
      const csv = json2csv.parse(data);
      res.header("Content-Type", "text/csv");
      res.attachment("transacoes.csv");
      res.send(csv);
    });
  }
});

router.post("/transactions/create", (req, res) => {
  if (!req.session.user) res.redirect("/");
  const amount = parseFloat(req.body.amount);
  const comment = req.body.comment;
  const category = req.body.category;
  const id = req.session.user!.id;
  const to = req.body.to;

  User.findOne({ where: { id: id } }).then((user: any) => {
    if (user && user.balance + amount > 0) {
      Transaction.create({
        userId: id,
        value: amount,
        comment: comment,
        categoryId: category,
        to: to,
      })
        .then(() => {
          user.update({ balance: user.balance + amount });
          res.redirect("/");
        })
        .catch(() => res.redirect("/transactions/new"));
    } else {
      res.redirect("/transactions/new");
    }
  });
});

export default router;
