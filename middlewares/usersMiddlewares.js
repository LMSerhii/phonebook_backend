import {
  createUserService,
  findUserByEmailService,
  removeTokenService,
} from "../services/usersServices.js";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const signUpUserMiddleware = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmailService(email);

  if (user) throw HttpError(409, "Email already in use");

  const newUser = await createUserService(req.body);

  req.user = newUser;
  next();
});

export const loginUserModdleware = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUserByEmailService(email);

  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) throw HttpError(401, "Account is not verified");

  const isCompare = await user.comparePassword(password);

  if (!isCompare) throw HttpError(401, "Email or password is wrong");

  await user.createToken();
  await user.save();

  req.user = user;
  next();
});

export const logoutUserMiddleware = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  await removeTokenService(_id);

  next();
});
