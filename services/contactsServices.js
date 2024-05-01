import { Contact } from "../models/contactModel.js";

export const listContacts = (body) => Contact.find(body);

export const getContactById = (id) => Contact.findById(id);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const addContact = (body) => Contact.create(body);

export const upgradeContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });
