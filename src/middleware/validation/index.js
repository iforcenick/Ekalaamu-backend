import {
  email,
  password,
  requiredParam,
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

  if (type === 'signup') {
    errorsArr.push([
      email(),
      password(),
      requiredParam('firstname'),
      requiredParam('lastname'),
    ]);
  }
  if (type === 'login') {
    errorsArr.push([
      email(),
      password()]);
  }
  if (type === 'resendEmail') {
    errorsArr.push([email()]);
  }
  return errorsArr;
};

const checkErrors = (req) => {
  const errors = customValidationResult(req);
  const requiredMsg = 'The field(s) are/is required.';
  if (!errors.isEmpty()) {
    const otherErrors = errors.array().filter(e => e.error !== requiredMsg).map(e => ({ error: e.error }));
    const requiredErrors = errors.array().filter(e => e.error === requiredMsg);
    const fields = requiredErrors.reduce((acc, it) => {
      acc.push(it.fields);
      return acc;
    }, []);
    const required = requiredErrors[0] ? {...requiredErrors[0], fields: fields.join(', ')} : null;

    return [...otherErrors, required];
  }
};

export { customValidationResult, authValidator, checkErrors };
