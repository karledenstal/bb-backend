import express from "express";
import { config as dotenvConfig } from "dotenv-safe";
import morgan from "morgan";
import cors from "cors";
import { json as bodyParserJson } from "body-parser";
import dbConnect from "./config/db";

async function main() {
  dotenvConfig({
    allowEmptyValues: true,
  });
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(morgan("dev"));
  app.use(cors());
  app.use(bodyParserJson({ limit: "100kb" }));

  await dbConnect();

  app.listen(port, () => {
    console.log("🚀 Take off on", port);
  });
}

main().catch((e) => console.error("init error", e));
