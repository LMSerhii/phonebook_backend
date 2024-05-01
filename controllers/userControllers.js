import {
  findUserByVerificationToken,
  updateVerify,
} from "../services/usersServices.js";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const signup = (req, res) => {
  const { name, email, token } = req.user;

  res.status(201).json({
    token,
    user: {
      name,
      email,
    },
  });
};

export const verifyByEmailController = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await findUserByVerificationToken(verificationToken);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await updateVerify(user._id);

  res.json({ message: "Verification successful" });
});

export const login = (req, res) => {
  const { name, email, token } = req.user;

  res.json({
    token,
    user: {
      name,
      email,
    },
  });
};

export const logout = (req, res) => {
  res.sendStatus(204);
};

export const current = (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};
