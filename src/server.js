import express from "express";
import pinoHttp from "pino-http";
import cors from "cors";
import ContactsRouter from "./routes/contacts.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/authenticate.js";
import path from "node:path";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";

const app = express();

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

app.use("/photo", express.static(path.resolve("src", "public/photo")));
app.use("/api-docs", swaggerDocs());

app.use(cors());

app.use(cookieParser());

app.use(
  pinoHttp({
    transport: {
      target: "pino-pretty",
    },
  })
);

app.use("/auth", authRouter);
app.use("/contacts", authenticate, ContactsRouter);

app.use(errorHandler);

app.use(notFoundHandler);
