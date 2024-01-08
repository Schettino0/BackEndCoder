import mongoose, { Schema, model } from "mongoose";

const collectionName = "carts";

const collectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

collectionSchema.pre("find", function () {
  this.populate("products.product");
});

export const CartModel = mongoose.model(collectionName, collectionSchema);
