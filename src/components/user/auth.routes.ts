import User from "./user.model";
import { Request, Response, Router } from "express";

const router = Router();

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { email, password, alias } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(403).json({ errors: "User exists" });
      return;
    }

    const newUser = await User.create({ email, password, alias });
    res.status(200).json(newUser);
  } catch (e) {
    console.log('e',e);
    res.status(500).json({ errors: e });
  }
});

export default router;
