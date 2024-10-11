import { Contacts } from "../models/contacts.js";

export async function getContacts(){
return await Contacts.find()
}
export async function getContactsID(contactID) {
    return await Contacts.findById(contactID)
}