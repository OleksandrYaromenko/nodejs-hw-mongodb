import {
  createContact,
  deleteContact,
  getContacts,
  getContactsID,
  patchContact,
} from "../services/contact.js";
import createHttpError from "http-errors";
import { parseParams } from "../utils/parseParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export async function ControllesrsGetContacts(req, res) {
  const { page, perPage } = parseParams(req.query);
console.log(req.params);
const {sortBy, sortOrder} = parseSortParams(req.query);

  const contact = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });
 

  return res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contact,
  });
}

export async function ControllesrsGetContactsID(req, res, next) {
  const { contactsID } = req.params;

  const contact = await getContactsID(contactsID);
  if (contact === null) {
    throw createHttpError(404, "Contacts not found");
  }
  return res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactsID}!`,
    data: contact,
  });
}
export async function ControllesrsPost(req, res) {
  // const contact = {
  //   name: req.body.name,
  //   phoneNumber: req.body.phoneNumber,
  //   contactType: req.body.contactType
  // }
  const result = await createContact(req.body);
  return res.status(201).send({
    status: 201,
    message: "Successfully created a contact!",
    data: result,
  });
}
export async function ControllesrsDelete(req, res) {
  const { contactsID } = req.params;

  const result = await deleteContact(contactsID);
  if (result === null) {
    throw createHttpError(404, "Contacts not found");
  }
  res.status(204).end();
}
export async function ControllesrsPatch(req, res) {
  const { contactsID } = req.params;

  const result = await patchContact(contactsID, req.body);

  if (result === null) {
    throw createHttpError(404, "Contacts not found");
  }
  res.status(200).send({
    status: 200,
    message: "Successfully patched a contact!",
    data: result,
  });
}
