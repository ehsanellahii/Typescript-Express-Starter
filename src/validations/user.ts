import { CustomError } from '../utility/customError';

export const userFormValidate = (req, res, next) => {
  const { body } = req;
  const { file } = req;
  const requiredFields = [];

  requiredFields.forEach(field => {
    if (!body[field])
      throw new CustomError(
        400,
        `'${field}' is a required field, Please try again with.`,
      );
  });
  next();
};
