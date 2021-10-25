import User from "./user.model";
import { Request, Response, Router } from "express";

const router = Router();

router.get('/', async (_, res: Response) => {
  try {
    const response = await User.find({}).select("-password");

    res.json(response);
  } catch (e) {
    res.json({ error: e });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    console.log('req', req.params);
    const response = await User.find({ slug: req.params.slug }).select("-password");

    res.json(response);
  } catch (e) {
    res.json({ error: e });
  }
})

export default router;