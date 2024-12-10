import catchAsync from '../middleware/asyncCacher';
import { createUserService } from '../services/user.services';

export const createUser = catchAsync(async (req, res) => {
  const user = await createUserService(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});
