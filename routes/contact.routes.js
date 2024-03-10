import express from "express";
import { contactController } from "../controllers/contact.controllers.js";

const contactRouter = express.Router();
const { getContacts, addContacts, updateContacts, deleteContacts } =
  contactController;

contactRouter.get("/contacts", async (req, res) => {
  const data = await getContacts();
  return data
    ? res.status(200).send({ msg: "contacts received ✅", data: data })
    : res.status(404).send({ msg: "ERROR! ❌", data: {} });
});

contactRouter.post("/contacts-add", async (req, res) => {
  const contact = req.body;
  const data = await addContacts(contact);
  return data
    ? res.status(200).send({ msg: "contact added ✅", data: data })
    : res.status(404).send({ msg: "ERROR! ❌", data: {} });
});

contactRouter.put("/contacts-update/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const data = await updateContacts(id, updates);
  return data
    ? res.status(200).send({ msg: "contact updated ✅", data: data })
    : res.status(404).send({ msg: "ERROR! ❌", data: {} });
});

contactRouter.delete("/contacts-delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await deleteContacts(id);
  return data
    ? res.status(200).send({ msg: "contact deleted ✅", data: data })
    : res.status(404).send({ msg: "ERROR! ❌", data: {} });
});

export { contactRouter };
