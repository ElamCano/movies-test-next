const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("Movie", MovieSchema);
