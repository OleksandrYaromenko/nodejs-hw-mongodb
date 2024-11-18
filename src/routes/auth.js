import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { confirmAuthSchema, loginSchema, registerSchema, resetPasswordSchema, resetPwdShema } from "../validator/auth.js";
import { loginController, registerController, logoutController, refreshController, resetPasswordController, resetPwdController, getAuthController, confirmAuthController} from "../controllers/auth.js";

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

authRouter.post("/logout", ctrlWrapper(logoutController))
authRouter.post("/refresh", ctrlWrapper(refreshController))

authRouter.post("/reset-password", jsonParser,validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController))
authRouter.post("/reset-pwd",jsonParser,validateBody(resetPwdShema),ctrlWrapper(resetPwdController))

authRouter.get("/get-auth-url", ctrlWrapper(getAuthController))
authRouter.post("/confirm-auth", jsonParser,validateBody(confirmAuthSchema),ctrlWrapper(confirmAuthController))

export default authRouter;
