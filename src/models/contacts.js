
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: String,
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ["work", "home", "personal"],
    required: true,
    default: "rersonal",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
  photo:{
    type: String,
    default: null,
  }
  
},{ timestamps: true });

const Contacts = mongoose.model("Contact",contactSchema);
 

export {Contacts};