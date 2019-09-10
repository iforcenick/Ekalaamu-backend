import sequelize from "sequelize";

import connection from "../../models";
import  { User }  from "../../models/user";
import { Actions } from "../../helpers/actions";
import { signToken } from "../../helpers/jwt";
import bcrypt from "bcrypt";

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

  static login = (req, res, next) => {

    db.then(async resp=> {
      User.findOne(
        {
        where: {
          email: req.body.email  
        }
      }
      ).done( 
        (users) => {
          if(!users){
            return res.status(404).json({Errors: "User doesn't exist or email is invalid"})
          }
        
          bcrypt.compare(req.body.password, users.dataValues.password, (result,err)=>{
            if(err===false){
              res.status(404).json({Errors: "Password and email do not match for this user"})
            }
            res.status(200).json({success: "Successfully logged in", token: signToken(users.dataValues.id)})
          })
        }
      )
    });
  };
}
