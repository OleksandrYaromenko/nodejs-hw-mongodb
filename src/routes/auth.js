import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, registerSchema } from "../validator/auth.js";
import { loginController, registerController, logoutController, refreshController} from "../controllers/auth.js";

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

export default authRouter;
