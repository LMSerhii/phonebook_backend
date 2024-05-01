export const getAllContacts = (req, res) => {
  const { contacts } = req;

  res.json(contacts);
};

export const getOneContact = (req, res) => {
  const { contact } = req;

  res.json(contact);
};

export const deleteContact = (req, res) => {
  const { status, message } = req.result;

  res.status(status).json(message);
};

export const createContact = (req, res) => {
  const { contact } = req;

  res.status(201).json(contact);
};

export const updateContact = (req, res) => {
  const { contact } = req.contact;

  res.json(contact);
};

export const updateFavorite = (req, res) => {
  const { contact } = req.contact;

  res.json(contact);
};
