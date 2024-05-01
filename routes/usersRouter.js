import express from "express";
import {
  current,
  login,
  logout,
  signup,
  verifyByEmailController,
} from "../controllers/userControllers.js";
import validateBody from "../utils/validateBody.js";
import { loginUserSchema, sigupUserSchema } from "../schemas/usersSchemas.js";
import {
  loginUserModdleware,
  logoutUserMiddleware,
  signUpUserMiddleware,
} from "../middlewares/usersMiddlewares.js";
import {
  auth,
  verifyByEmailMiddleware,
} from "../middlewares/authMiddlewares.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(sigupUserSchema),
  signUpUserMiddleware,
  verifyByEmailMiddleware,
  signup
);

authRouter.post("/verify/:verificationToken", verifyByEmailController);

authRouter.post(
  "/login",
  validateBody(loginUserSchema),
  loginUserModdleware,
  login
);

authRouter.post("/logout", auth, logoutUserMiddleware, logout);
authRouter.get("/current", auth, current);

export default authRouter;
