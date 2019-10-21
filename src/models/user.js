import { Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import connection from '.';

export const User = connection.define(
  'User',
  {
    id: {
      type: Sequelize.STRING,
      unigue: true,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: { args: true, msg: 'Provide a valid email.' },
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: { args: [8], msg: 'Password should be a minimum of 8 characters.' },
      },
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      afterValidate: (user) => {
        // eslint-disable-next-line no-param-reassign
        user.id = bcrypt.hashSync(user.email, 8);
        // eslint-disable-next-line no-param-reassign
        user.password = bcrypt.hashSync(user.password, 8);
      },
    },
  },
);

User.prototype.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};
