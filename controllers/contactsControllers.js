import {
  addContact,
  getContatcById,
  listContacts,
  removeContact,
  upgradeContact,
} from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  listContacts();

  res.status(200).json({
    message: "list contacts",
  });
};

export const getOneContact = (req, res) => {
  getContatcById();

  res.status(200).json({ message: "get one contact" });
};

export const deleteContact = (req, res) => {
  removeContact();

  res.status(200).json({
    message: "delete successfull",
  });
};

export const createContact = (req, res) => {
  addContact();

  res.status(201).json({
    message: "create contact",
  });
};

export const updateContact = (req, res) => {
  upgradeContact();

  res.status(200).json({
    message: "update successfull",
  });
};
