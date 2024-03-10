import dotenv from "dotenv";
import { Contacts } from "../models/contacts.js";

dotenv.config();

const contact = Contacts;

export const contactController = {
  //get all contacts
  getContacts: async () => {
    try {
      const data = await contact.find({});
      return data != null ? data : {};
    } catch (err) {
      throw err;
    }
  },
  //if not in contacts add new contact
  addContacts: async (adding) => {
    try {
      const data = await contact.findOne({ number: adding.number });
      if (data) {
        throw new Error("Number already exists");
      } else {
        const newContact = await contact.create({
          first_name: adding.first_name,
          last_name: adding.last_name ?? null,
          number: adding.number,
          email: adding.email ?? null,
        });
        return newContact.toObject();
      }
    } catch (err) {
      throw err;
    }
  },
  //if in contacts update the contact
  updateContacts: async (_id, updates) => {
    try {
      const data = await contact.findOne({ _id });
      if (data) {
        const update = await contact.findByIdAndUpdate(
          _id,
          {
            first_name: updates.first_name || data.first_name,
            last_name: updates.last_name || data.last_name,
            number: updates.number || data.number,
            email: updates.email || data.email,
          },
          { new: true }
        );
        if (update) return update.toObject();
        else throw new Error("updated failed");
      } else {
        throw new Error("Contact not found");
      }
    } catch (err) {
      throw err;
    }
  },
  //if in contacts delete the contact
  deleteContacts: async (_id) => {
    try {
      const data = await contact.findOne({ _id });
      if (data) {
        const del = await contact.deleteOne({ _id });
        if (del) {
          return {
            msg: `successfull deleted contact!`,
          };
        }
      }
    } catch (err) {
      throw err;
    }
  },
};
