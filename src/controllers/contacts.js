import { getContacts, getContactsID } from "../services/contact.js";
import createHttpError from "http-errors";

export async function ControllesrsGetContacts(req, res) {
        
          const contact = await getContacts();
          return res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contact,
})
        }

export async function ControllesrsGetContactsID(req,res,next) {
    const { contactsID } = req.params;
    
      const contact = await getContactsID(contactsID);
      if (contact === null) {
        throw next(createHttpError(404,"Contacts not found"))
      }
      return res.status(200).send({
        status: 200,
        message: `Successfully found contact with id ${contactsID}!`,
        data: contact,
      });
    } 
    
    
