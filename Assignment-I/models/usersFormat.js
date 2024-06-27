const mongoose = require("mongoose");
const { Schema } = mongoose;

let userSchema = new Schema({
  name: { type: String, minlength: 4, required: true, trim: true },
  email: { type: String, required: true, trim: true },
});

// create model
const User = mongoose.model("User", userSchema);

// export
module.exports = User;
