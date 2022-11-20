import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
