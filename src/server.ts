import express from "express";
import { config as dotenvConfig } from "dotenv-safe";
import morgan from "morgan";
import cors from "cors";
import {
  json as bodyParserJson,
  urlencoded as bParserUrlEncoded,
} from "body-parser";
import dbConnect from "./config/db";
import passport from "passport";
import { Server } from "socket.io";
import routes from "./config/routes";
import http from "http";

async function main() {
  dotenvConfig({
    allowEmptyValues: true,
  });
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const port = process.env.PORT || 8080;

  app.use(morgan("dev"));
  app.use(cors());
  app.use(bodyParserJson({ limit: "100kb" }));
  app.use(bParserUrlEncoded({ extended: true }));
  app.use(passport.initialize());

  io.on("connection", (socket) => {
    console.log("💽 IO connected");

    socket.on("disconnect", () => {
      console.log("💽 IO disconnected");
    });
  });

  // initialize routes
  routes(app);

  // connect to db
  await dbConnect();

  server.listen(port, () => {
    console.log("🚀 Take off on", port);
  });
}

main().catch((e) => console.error("init error", e));
