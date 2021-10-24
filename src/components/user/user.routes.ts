import { userModel } from "../user";
import { Request, Response, Router } from "express";

const router = Router();

router.get('/', async (_, res: Response) => {
  try {
    const response = await userModel.find({});

    res.json(response);
  } catch (e) {
    res.json({ error: e });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    console.log('req', req.params);
    const response = await userModel.findById(req.params.id);

    res.json(response);
  } catch (e) {
    res.json({ error: e });
  }
})

export default router;