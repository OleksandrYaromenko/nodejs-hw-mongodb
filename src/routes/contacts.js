import express from "express"
import { ControllesrsGetContacts, ControllesrsGetContactsID, ControllesrsPost, ControllesrsDelete,ControllesrsPatch } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/ isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactsSchema } from "../validator/contacts.js";

const router = express.Router()
const jsonParser =express.json()

router.get("/",ctrlWrapper(ControllesrsGetContacts));

router.get("/:contactsID",isValidId, ctrlWrapper(ControllesrsGetContactsID));
  
router.post("/", jsonParser,validateBody(contactsSchema), ctrlWrapper(ControllesrsPost));

router.patch("/:contactsID", isValidId,jsonParser,ctrlWrapper(ControllesrsPatch))

router.delete("/:contactsID",isValidId, ctrlWrapper(ControllesrsDelete))



  export default router;
  