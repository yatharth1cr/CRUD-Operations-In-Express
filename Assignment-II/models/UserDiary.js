const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userDiarySchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  age: { type: Number, min: 18, required: true },
  bio: { type: String, trim: true, required: true },
});

let UserDiary = mongoose.model("Userdiary", userDiarySchema);

module.exports = UserDiary;
