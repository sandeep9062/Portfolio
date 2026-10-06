import mongoose from "mongoose";
import type { Model } from "mongoose";

export interface IMessage {
  name: string;
  email?: string;
  message: string;
  contactno: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String },
    message: { type: String, required: true },
    contactno: { type: String, required: true },
  },
  { timestamps: true },
);

const Message: Model<IMessage> =
  (mongoose.models.Message as Model<IMessage>) ||
  mongoose.model<IMessage>("Message", messageSchema);

export default Message;
