import { Contacts } from "../models/contacts.js";

export async function getContacts({ page, perPage, sortBy, sortOrder, userId }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const [total, contacts] = await Promise.all([
    Contacts.countDocuments({ userId }),
    Contacts.find({ userId }) 
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPage = Math.ceil(total / perPage);
  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPage,
    hasNextPage: totalPage - page > 0,
    hasPreviousPage: page > 1,
  };
}
export async function getContactsID(contactID, userId) {
  return await Contacts.findOne({_id:contactID, userId  });
}
export async function createContact(contact) {
  return Contacts.create(contact);
}
export async function deleteContact(contactID, userId) {
  return Contacts.findOneAndDelete({_id:contactID, userId });
}
export async function patchContact(contactID, newContact, userId) {
  return Contacts.findOneAndUpdate(
    { _id: contactID, userId },
    newContact,
    { new: true }
  );
}
