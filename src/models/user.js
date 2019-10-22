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
    strategy: {
      type: Sequelize.STRING,
      allowNull: false,
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
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      afterValidate: (user) => {
        if (user.strategy === 'local') {
          user.id = bcrypt.hashSync(user.email, 8);
          user.password = bcrypt.hashSync(user.password, 8);
        }
        user.id = user.socialId;
      },
    },
  },
);

User.prototype.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};
