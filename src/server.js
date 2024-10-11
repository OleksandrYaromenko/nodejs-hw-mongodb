import express from 'express'
import pinoHttp from "pino-http";
import cors from "cors"
import { getContacts, getContactsID } from './services/contact.js';

const app = express();
 
const PORT = "8080"

app.use(cors());

app.use(pinoHttp({
    transport:{
        target: "pino-pretty"
    }
}))

app.get("/contacts", async (req,res) => {
    try {
        const contact = await getContacts()
        res.status(200).send({
            status: 200,
        message: 'Successfully found contacts!',
        data: contact,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get contacts',
            error: error.message,
          });
    }
})
app.get("/contacts/:contactsID", async (req,res) =>{
    const {contactsID} = req.params
    try {
        const contact = await getContactsID(contactsID)
        if (!contact){
            return res.status(404).send({message: "Contact not found"})
        }
        res.status(200).send({
            status: 200,
            message: `Successfully found contact with id ${contactsID}!`,
            data: contact,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get contacts',
            error: error.message,
          });
    }
})



app.use("*", (req, res) => {
    res.status(404).send({
      message: "Not found",
    });
  });;

async function setupServer (){
    try {
        
        await app.listen(8080, () => {
            console.log(`Server is running on port ${PORT}`);
          });
    } catch (error) {
        console.error(error)
    }
}


export {setupServer};