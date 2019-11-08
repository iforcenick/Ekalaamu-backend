const { check, body } = require('express-validator');

const requiredParam = (param) => check(param).not()
  .isEmpty()
  .withMessage('The field(s) are/is required.');

const password = () => check('password')
  .not()
  .isEmpty()
  .withMessage('The field(s) are/is required.')
  .if(body('password').exists())
  .isLength({ min: 7 })
  .withMessage('Password should be a minimum of 8 characters');

const title = () => check('title').trim().escape().isLength({ max: 100 })
  .withMessage('title should have a maximum of 100 characters');
const description = () => check('description').trim().escape().isLength({ max: 150 })
  .withMessage('description should have a max of 150 characters');

const email = () => check('email')
  .not()
  .isEmpty()
  .withMessage('The field(s) are/is required.')
  .if(body('email').exists())
  .isEmail()
  .withMessage('Email is invalid.');

export {
  requiredParam, password, email, title, description,
};
