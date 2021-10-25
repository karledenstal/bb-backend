import { Express } from "express";
import { userRoutes, authRoutes } from "../components/user";

export default function(app: Express) {
  app.get('/', (_, res) => {
    res.status(200).json("You're not supposed to be here >:(");
  });

  app.use('/auth', authRoutes); 
  app.use('/users', userRoutes);
}
