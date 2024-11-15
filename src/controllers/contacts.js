import fs from "node:fs/promises"
import path from "node:path"
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
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import dotenv from "dotenv";

 dotenv.config();

export async function ControllesrsGetContacts(req, res) {
  const { page, perPage } = parseParams(req.query);
const {sortBy, sortOrder} = parseSortParams(req.query);
const userId = req.user.id;
console.log(userId, "user id");

 
  const contact = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId
  });


  return res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contact,
  });
}

export async function ControllesrsGetContactsID(req, res, next) {
  const { contactsID } = req.params;
  const userId = req.user.id;

  const contact = await getContactsID(contactsID,userId);
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
  let photo = null;

  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === "true") {
      const uploadPhoto = await uploadToCloudinary(req.file.path)
      await fs.unlink(req.file.path) 
      console.log(uploadPhoto);
      photo =  uploadPhoto.secure_url
    }else { 
        await fs.rename(req.file.path, path.resolve("src","public/photo",req.file.filename))
    photo = `http://localhost:3000/photo/${req.file.filename}`
    }
 
  }
  
  const userId = req.user.id;
  const contactData = { ...req.body, userId, photo };
  const result = await createContact(contactData);
  return res.status(201).send({
    status: 201,
    message: "Successfully created a contact!",
    data: result,
  });
}
export async function ControllesrsDelete(req, res) {
  const { contactsID } = req.params;
  const userId = req.user.id;

  const result = await deleteContact(contactsID,userId);
  if (result === null) {
    throw createHttpError(404, "Contacts not found");
  }
  res.status(204).end();
}
export async function ControllesrsPatch(req, res) {
  const { contactsID } = req.params;
  const userId = req.user.id;
  let photo = null; 

  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === "true") {
      const uploadPhoto = await uploadToCloudinary(req.file.path)
      await fs.unlink(req.file.path) 
      console.log(uploadPhoto);
      photo =  uploadPhoto.secure_url
    }else { 
        await fs.rename(req.file.path, path.resolve("src","public/photo",req.file.filename))
     photo = `http://localhost:3000/photo/${req.file.filename}`
    }
 
  }
  const result = await patchContact(contactsID, req.body, userId , photo);

  if (result === null) {
    throw createHttpError(404, "Contacts not found");
  }
  res.status(200).send({
    status: 200,
    message: "Successfully patched a contact!",
    data: result,
  });
}
