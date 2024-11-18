import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  resetPwdShema,
} from "../validator/auth.js";
import {
  loginController,
  registerController,
  logoutController,
  refreshController,
  resetPasswordController,
  resetPwdController,
} from "../controllers/auth.js";

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post(
  "/register",
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController)
);

authRouter.post(
  "/login",
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController)
);

authRouter.post("/logout", ctrlWrapper(logoutController));
authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post(
  "/send-reset-email",
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);
authRouter.post(
  "/reset-pwd",
  jsonParser,
  validateBody(resetPwdShema),
  ctrlWrapper(resetPwdController)
);

export default authRouter;
