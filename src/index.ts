import express from "express";
import session from "express-session";
const app = express();
import path from "path";
import connection from "./database/database";
import UserController from "@controllers/UserController";
import TransactionController from "@controllers/TransactionController";
import CategoryController from "@controllers/CategoryController";
import User from "@models/User";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

declare module "express-session" {
  interface SessionData {
    user: { id: number; email: String };
  }
}

app.use(
  session({
    secret: "fisdhlfjsadoieuqrqw",
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(express.static(path.join(__dirname, "../src/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((error: any) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  if (req.session.user) {
    User.findOne({ where: { id: req.session.user.id } }).then((user) => {
      res.render("index", { user: user });
    });
  } else {
    res.redirect("/users/login");
  }
});

app.use(UserController);
app.use(TransactionController);
app.use(CategoryController);

app.listen(8080, () => {
  console.log("Servidor rodando");
});
