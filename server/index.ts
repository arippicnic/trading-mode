import "dotenv/config.js";
import express from "express";
import next from "next";
import helmet from "helmet";
import cors from "cors";

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

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  startServer();

  function startServer() {
    server.listen(PORT, async (error?: any) => {
      if (error) {
        return console.error(error);
      } else {
        return console.info(`Server running on ${PORT} [${NODE_ENV}]`);
      }
    });
  }
});
