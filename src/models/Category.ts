import { DataTypes } from "sequelize";
import connection from "../database/database";

const Category = connection.define("categories", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.sync();

export default Category;
