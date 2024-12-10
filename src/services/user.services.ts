import UserModel from '../models/user.models';
import { CustomError } from '../utility/customError';
import Logger from '../utility/logger';
import * as bcrypt from 'bcrypt';

export const getUserByEmailService = async email => {
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  return user;
};

export const createUserService = async ({ name, email, password }) => {
  const user = await getUserByEmailService(email);
  Logger.info('User: ', user);
  if (user)
    throw new CustomError(
      400,
      `User email address: ${email} already exists. Please login then.`,
    );
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const newUser = await UserModel.create({
    name,
    email,
    password: encryptedPassword,
    role: 'Admin',
  });
  newUser.password = undefined;
  return newUser;
};
