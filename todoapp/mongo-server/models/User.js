const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});
//Export model
module.exports = mongoose.model("User", UserSchema);
