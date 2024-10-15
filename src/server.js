import express from "express";
import pinoHttp from "pino-http";
import cors from "cors";
import ContactsRouter from "./routes/contacts.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js"

const app = express();

app.use("/contacts",ContactsRouter)


app.use(cors());

app.use(
    pinoHttp({
        transport: {
            target: "pino-pretty",
        },
    })
);

app.use(errorHandler)

app.use(notFoundHandler);


const PORT = process.env.PORT || 3000;

async function setupServer() {
    try {
        await app.listen(8080, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

export { setupServer };
