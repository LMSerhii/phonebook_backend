import express from "express";
import {
  current,
  login,
  logout,
  resendVerifyController,
  signup,
  verifyByEmailController,
} from "../controllers/userControllers.js";
import validateBody from "../utils/validateBody.js";
import {
  emailUserSchema,
  loginUserSchema,
  sigupUserSchema,
} from "../schemas/usersSchemas.js";
import {
  loginUserModdleware,
  logoutUserMiddleware,
  signUpUserMiddleware,
} from "../middlewares/usersMiddlewares.js";
import {
  auth,
  resendVerifyEmailMiddleware,
  sendVerifyEmail,
  verifyByEmailMiddleware,
} from "../middlewares/authMiddlewares.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(sigupUserSchema),
  signUpUserMiddleware,
  sendVerifyEmail,
  signup
);

authRouter.get(
  "/verify/:verificationToken",
  verifyByEmailMiddleware,
  verifyByEmailController
);

authRouter.post(
  "/verify",
  validateBody(emailUserSchema),
  resendVerifyEmailMiddleware,
  sendVerifyEmail,
  resendVerifyController
);

authRouter.post(
  "/login",
  validateBody(loginUserSchema),
  loginUserModdleware,
  login
);

authRouter.post("/logout", auth, logoutUserMiddleware, logout);
authRouter.get("/current", auth, current);

export default authRouter;
