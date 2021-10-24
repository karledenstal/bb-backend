import { Express } from "express";
import { userRoutes, authRoutes } from "../components/user";

export default function(app: Express) {
  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);
}
