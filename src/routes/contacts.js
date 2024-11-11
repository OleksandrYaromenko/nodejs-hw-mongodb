import express from "express"
import { ControllesrsGetContacts, ControllesrsGetContactsID, ControllesrsPost, ControllesrsDelete,ControllesrsPatch } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router()
const jsonParser =express.json()

router.get("/",ctrlWrapper(ControllesrsGetContacts));

router.get("/:contactsID",ctrlWrapper(ControllesrsGetContactsID));
  
router.post("/", jsonParser, ctrlWrapper(ControllesrsPost));

router.patch("/:contactsID",jsonParser,ctrlWrapper(ControllesrsPatch))

router.delete("/:contactsID", ctrlWrapper(ControllesrsDelete))



  export default router;
  