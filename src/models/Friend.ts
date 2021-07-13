import connection from "../database/database";
import User from "@models/User";

const Friend = connection.define("friends", {});

Friend.belongsTo(User, { as: "friends" });
User.hasMany(Friend, { as: "friends" });

Friend.sync();

export default Friend;
