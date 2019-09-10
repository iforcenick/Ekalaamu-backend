import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import connection from ".";
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

// import sequelize, { DataTypes } from "sequelize";
// import bcrypt from "bcrypt";
// import connection from ".";
//  const UserModal =  (sequelize, DataTypes) =>{
//     const User = sequelize.define(
//         "User",
//         {
//           id: {
//             type: DataTypes.STRING,
//             unigue: true,
//             primaryKey: true
//           },
//           firstname: {
//             type: DataTypes.STRING,
//             allowNull: false
//           },
//           lastname: {
//             type: DataTypes.STRING,
//             allowNull: false
//           },
//           email: {
//             type: DataTypes.STRING,
//             validate: {
//               isEmail: { args: true, msg: "Provide a valid email." }
//             }
//           },
//           password: {
//             type: DataTypes.STRING,
//             validate: {
//               len: { args: [8], msg: "Password should be a minimum of 8 characters." }
//             }
//           },
//           verified: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//           }
//         },
//         {
//           hooks: {
//             afterValidate: user => {
//               user.id = bcrypt.hashSync(user.email, 8);
//               user.password = bcrypt.hashSync(user.password, 8);
//             }
//           }
//         }
//       );
//       return User;
      

// }
// module.exports = UserModal