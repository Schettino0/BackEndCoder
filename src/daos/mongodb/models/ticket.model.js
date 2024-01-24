import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "ticket";

const collectionSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

collectionSchema.plugin(mongoosePaginate);
export const TicketModel = mongoose.model(collectionName, collectionSchema);
