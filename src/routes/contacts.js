import express from "express"
import { ControllesrsGetContacts, ControllesrsGetContactsID } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router()

router.get("/",ctrlWrapper(ControllesrsGetContacts));

router.get("/:contactsID",ctrlWrapper(ControllesrsGetContactsID));
  


  export default router;
  