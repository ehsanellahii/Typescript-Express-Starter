import express from 'express';

import { createUser } from '../controllers/user.controller';
import { userFormValidate } from '../validations/user';

const router = express.Router();
router.route('/').post(userFormValidate, createUser);

export default router;
