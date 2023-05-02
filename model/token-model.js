const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    secret: String,
    authIsSet: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Token", tokenSchema);
