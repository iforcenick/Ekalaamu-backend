import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import connection from "./index";

export const User = connection.define(
  "User",
  {
    id: {
      type: Sequelize.STRING,
      unigue: true,
      primaryKey: true
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: { args: true, msg: "Provide a valid email." }
      }
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: { args: [8], msg: "Password should be a minimum of 8 characters." }
      }
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    hooks: {
      afterValidate: user => {
        user.id = bcrypt.hashSync(user.email, 8);
        user.password = bcrypt.hashSync(user.password, 8);
      }
    }
  }
);
