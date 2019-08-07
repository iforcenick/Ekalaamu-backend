import * as JWT from 'jsonwebtoken'
export const signToken = userId => {
    return JWT.sign(
      {
        iss: process.env.JWT_ISSUER,
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      },
      process.env.JWT_SECRET
    );
  }
