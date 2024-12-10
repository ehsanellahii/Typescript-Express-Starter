import { Request, Response, Router } from 'express';
import userRouter from './user.routes';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: '✅ Server Is Working!!',
  });
});

router.use('/users', userRouter);

// router.all('*', (req: Request, res: Response) => {
//   res.status(404).json({
//     data: req.url,
//     message: '🔍 - URL Not Found',
//   });
// });

export default router;
