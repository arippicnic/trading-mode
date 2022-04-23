import "dotenv/config.js";
import express from "express";
import next from "next";
import helmet from "helmet";
import cors from "cors";

import connectToDatabase from "./services/db";
import routes from "./routes";

const { NODE_ENV, PORT } = process.env;
const dev = NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use("/api/v2", routes);

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  startServer();

  function startServer() {
    server.listen(PORT, async (error?: Error) => {
      if (error) {
        return console.error(error);
      } else {
        await connectToDatabase();
        return console.info(`Server running on ${PORT} [${NODE_ENV}]`);
      }
    });
  }
});