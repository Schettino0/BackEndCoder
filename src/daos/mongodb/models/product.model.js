import { Schema, model } from "mongoose";

const collectionName = "products";

const collectionSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  }
});

export const ProductModel = model(collectionName, collectionSchema);
