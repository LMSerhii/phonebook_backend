import { sendEmail } from "../services/emailServices.js";
import { verifyUserToken } from "../services/usersServices.js";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const auth = catchAsync(async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw HttpError(401);

  const user = await verifyUserToken(token);

  if (!user || !user.token || user.token !== token) throw HttpError(401);

  req.user = user;
  next();
});

export const verifyByEmailMiddleware = catchAsync(async (req, res, next) => {
  const { email, verificationToken } = req.user;

  await sendEmail(email, verificationToken);

  next();
});
