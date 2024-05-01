import { isValidObjectId } from "mongoose";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  upgradeContact,
} from "../services/contactsServices.js";
import validateBody from "../utils/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const handleContactNotFound = (req, res, next) => {
  const { status, message } = HttpError(404);
  return res.status(status).json({ message });
};

export const isValiId = (req, res, next) => {
  const { id } = req.params();

  if (!isValidObjectId(id)) next(HttpError(400, `${id} is not valid id`));

  next();
};

export const findContacts = catchAsync(async (req, res, next) => {
  const contacts = await listContacts();

  req.contacts = contacts;
  next();
});

export const findContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const contact = await getContactById(id);

  if (!contact) return handleContactNotFound(req, res);

  req.contact = contact;
  next();
});

export const cutContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await removeContact(id);

  req.result = { status: 200, message: "Contact deleted successfully" };
  next();
});

export const validateCreateContact = (req, res, next) => {
  validateBody(createContactSchema)(req, res, next);
};

export const validateUpdateContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Body must have at least one field"));
    return;
  }

  validateBody(updateContactSchema)(req, res, next);
};

export const makeContact = catchAsync(async (req, res, next) => {
  const contact = await addContact(req.body);

  req.contact = contact;
  next();
});

export const refreshContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const contact = await upgradeContact(id, req.body);

  req.contact = contact;
  next();
});
