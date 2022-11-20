import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  country: {
    type: String,
    default: "",
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
