import { Express } from "express";
import { userRoutes } from "../components/user";

export default function(app: Express) {
  app.use('/users', userRoutes);
}
