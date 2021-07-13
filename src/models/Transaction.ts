import { DataTypes } from "sequelize";
import connection from "../database/database";
import User from "@models/User";
import Category from "@models/Category";

const Transaction = connection.define("transactions", {
  to: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Transaction.belongsTo(User);
User.hasMany(Transaction);

Category.hasMany(Transaction);
Transaction.belongsTo(Category);

Transaction.sync();

export default Transaction;
