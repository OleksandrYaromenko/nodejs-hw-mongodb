import { Contacts } from "../models/contacts.js";

export async function getContacts(){
return await Contacts.find()
}
export async function getContactsID(contactID) {
    return await Contacts.findById(contactID)
}
export async function createContact(contact) {
    return Contacts.create(contact)
}
export async function deleteContact(contactID) {
    return Contacts.findByIdAndDelete(contactID)
}
export async function patchContact(contactID,newContact) {
    return Contacts.findByIdAndUpdate(contactID,newContact,{new: true})
}