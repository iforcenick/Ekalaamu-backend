import sequelize from "sequelize";

import connection from "../../models";
import { User } from "../../models/user";
import { Actions } from "../../helpers/actions";
import { signToken } from "../../helpers/jwt";

const db = connection.sync();
const Op = sequelize.Op;

export default class AuthController {
  static signUp = (req, res, next) => {
    db.then(async resp => {
      User.findAll({
        where: {
          email: {
            [Op.or]: [req.body.email]
          }
        }
      }).done(
        users =>
          users.length
            ? res.status(400).json({ errors: ['Email already in use.'] })
            : Actions.addData(User, req.body, [
                "id",
                "firstname",
                "lastname",
                "email",
                "password"
              ])
              .then(user => res.status(201).json({ user: user.email, token: signToken(user.id) }))
              .catch(err => res.status(400).json({ errors: err.errors.map(er => er.message) }))
      );
        
    });
  };
}
