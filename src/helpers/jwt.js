import * as JWT from 'jsonwebtoken';

const ONE_HOUR = (new Date().getTime() + 60 * 60 * 1000) / 1000;

const signToken = (userId, exp = null) => {
  const expiresIn = exp || new Date().setDate(new Date().getDate() + 1);
  return JWT.sign(
    {
      iss: process.env.JWT_ISSUER,
      sub: userId,
      iat: new Date().getTime(),
      exp: expiresIn,
    },
    process.env.JWT_SECRET,
  );
};

const decodeToken = (token) => {
  let subject = false;
  try {
    subject = JWT.verify(token, process.env.JWT_SECRET).sub;
  } catch (e) {
    console.log('kkk', e);
    return subject;
  }
  return subject;
};

export { signToken, decodeToken, ONE_HOUR };
