import { Sequelize } from "sequelize";

const connection = new Sequelize("tecnospeed", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
  timezone: "-03:00",
});

export default connection;
