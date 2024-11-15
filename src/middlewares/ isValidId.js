import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export function  isValidId(req,res,next) {
    const {contactsID} = req.params;
    if (isValidObjectId(contactsID) !== true ) {
        return next(createHttpError(400, "Id is not valid"))
    }
    next()
}