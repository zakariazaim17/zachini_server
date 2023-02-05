import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "",
  },
  date_of_birth: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
  zip_code: {
    type: Number,
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
