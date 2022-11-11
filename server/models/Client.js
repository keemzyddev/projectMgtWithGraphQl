import mongoose from "mongoose";
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
