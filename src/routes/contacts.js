import express from "express";
import {
  ControllesrsGetContacts,
  ControllesrsGetContactsID,
  ControllesrsPost,
  ControllesrsDelete,
  ControllesrsPatch,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/ isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactsSchema } from "../validator/contacts.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ctrlWrapper(ControllesrsGetContacts));

router.get("/:contactsID", isValidId, ctrlWrapper(ControllesrsGetContactsID));

router.post(
  "/",
  upload.single("photo"),
  jsonParser,
  validateBody(contactsSchema),
  ctrlWrapper(ControllesrsPost)
);

router.patch(
  "/:contactsID",
  upload.single("photo"),
  isValidId,
  ctrlWrapper(ControllesrsPatch)
);

router.delete("/:contactsID", isValidId, ctrlWrapper(ControllesrsDelete));

export default router;
