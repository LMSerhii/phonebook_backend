import express from "express";

import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import {
  cutContact,
  findContact,
  findContacts,
  isValiId,
  makeContact,
  refreshContact,
  validateCreateContact,
  validateUpdateContact,
} from "../middlewares/contactsMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", findContacts, getAllContacts);

contactsRouter.get("/:id", isValiId, findContact, getOneContact);

contactsRouter.delete("/:id", isValiId, cutContact, deleteContact);

contactsRouter.post("/", validateCreateContact, makeContact, createContact);

contactsRouter.put(
  "/:id",
  isValiId,
  validateUpdateContact,
  refreshContact,
  updateContact
);

contactsRouter.patch("/:id/favorite", isValiId, updateFavorite);

export default contactsRouter;
