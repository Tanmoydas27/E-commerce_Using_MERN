const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      paymentAmount: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
      },
      mobile: {
        type: Number,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("tempcarts", tempSchema);
