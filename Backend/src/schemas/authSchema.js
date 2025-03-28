import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    profileBio: {
      type: String,
      default: "Hey! I am new",
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("users", schema);
export default User;
