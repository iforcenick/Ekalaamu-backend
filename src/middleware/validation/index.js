import {
  email,
  password,
  requiredParam, title, description,
} from './schemas';

const { validationResult } = require('express-validator');

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    error: error.msg,
    fields: error.param,
  }),
});

const authValidator = (type) => {
  const errorsArr = [];

  switch (type) {
    case 'signup':
      errorsArr.push([
        email(),
        password(),
        requiredParam('firstname'),
        requiredParam('lastname'),
      ]);
      break;
    case 'login':
      errorsArr.push([
        email(),
        password()]);
      break;
    case 'create-article':
      errorsArr.push([
        title(),
        description(),
        requiredParam('title'),
        requiredParam('description'),
        requiredParam('body'),
      ]);
      break;
    default:
      errorsArr.push([email()]);
  }
  return errorsArr;
};

const checkErrors = (req) => {
  const errors = customValidationResult(req);
  const requiredMsg = 'The field(s) are/is required.';
  if (!errors.isEmpty()) {
    const otherErrors = errors.array().filter((e) => e.error !== requiredMsg).map(
      (e) => ({ error: e.error }),
    );
    const requiredErrors = errors.array().filter((e) => e.error === requiredMsg);
    const fields = requiredErrors.reduce((acc, it) => {
      acc.push(it.fields);
      return acc;
    }, []);
    const required = requiredErrors[0] ? { ...requiredErrors[0], fields: fields.join(', ') } : null;

    return [...otherErrors, required];
  }
};

export { customValidationResult, authValidator, checkErrors };
