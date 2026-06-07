import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    contactno: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
