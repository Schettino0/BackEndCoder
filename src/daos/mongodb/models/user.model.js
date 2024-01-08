import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
  isGitHub: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("find", function () {
  this.populate("cart");
});

export const UserModel = model("users", userSchema);
