import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
