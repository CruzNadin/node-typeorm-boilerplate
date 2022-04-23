import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { createExpressServer } from "routing-controllers";
import path = require("path");
require("dotenv").config();

AppDataSource.initialize().then(async () => {
  const app = createExpressServer({
    defaultErrorHandler: false,
    routePrefix: "/api",
    controllers: [
      path.join(__dirname + "/controllers/*ts"),
      path.join(__dirname + "/controllers/*js"),
    ],
    middlewares: [
      path.join(__dirname + "/middlewares/*.ts"),
      path.join(__dirname + "/middlewares/*js"),
    ],
  });

  app.listen(3000);
});
