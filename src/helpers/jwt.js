import * as JWT from 'jsonwebtoken';

const signToken = (userId) => JWT.sign(
  {
    iss: process.env.JWT_ISSUER,
    sub: userId,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  },
  process.env.JWT_SECRET,
);

const decodeToken = (token) => JWT.verify(token, process.env.JWT_SECRET).sub;

export { signToken, decodeToken };
