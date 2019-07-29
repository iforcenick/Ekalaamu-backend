import sequelize from "sequelize";
import bcrypt from "bcrypt";
import connection from ".";
export const User = connection.define(
  "User",
  {
    id: {
      type: sequelize.STRING,
      unigue: true,
      primaryKey: true
    },
    firstname: {
      type: sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: sequelize.STRING,
      allowNull: false
    },
    email: {
      type: sequelize.STRING,
      validate: {
        isEmail: { args: true, msg: "Provide a valid email." }
      }
    },
    password: {
      type: sequelize.STRING,
      validate: {
        len: { args: [8], msg: "Password should be a minimum of 8 characters." }
      }
    },
    verified: {
      type: sequelize.BOOLEAN,
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
