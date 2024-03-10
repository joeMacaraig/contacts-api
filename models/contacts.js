import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
});

export const Contacts = mongoose.model("Contacts", ContactSchema);
