import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import TwitterTokenStrategy from 'passport-twitter-token';
import { Actions } from '../helpers/actions';
import { User } from '../models/user';

// Google OAUTH strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
  await newSocialAccount(profile, done);
}));

// Facebook OAUTH strategy
passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: process.env.facebookClientID,
  clientSecret: process.env.facebookClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
  await newSocialAccount(profile, done);
}));

// Twitter OAUTH strategy
passport.use('twitterToken', new TwitterTokenStrategy({
  consumerKey: process.env.twitterClientID,
  consumerSecret: process.env.twitterClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
  await newSocialAccount(profile, done);
}));

// eslint-disable-next-line consistent-return
const newSocialAccount = async (profile, done) => {
  try {
    const existingUser = await User.findOne({
      where: {
        id: profile.id,
        strategy: profile.provider,
      },
    });
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUserAccount = await userData(profile);
    done(null, newUserAccount);
  } catch (error) {
    done(error, false, error.message);
  }
};

const userData = (profile) => {
  if (profile.provider === 'twitter') {
    const name = profile.displayName.split(' ');
    // eslint-disable-next-line prefer-destructuring
    profile.name.givenName = name[0];
    // eslint-disable-next-line prefer-destructuring
    profile.name.familyName = name[1];
  }

  const data = {
    id: profile.id,
    firstname: profile.name.familyName,
    lastname: profile.name.givenName,
    email: profile.emails[0].value,
    verified: true,
    strategy: profile.provider,
  };

  return Actions.addData(User, data, [
    'id',
    'firstname',
    'lastname',
    'email',
    'strategy',
    'verified',
    'password',
  ]);
};

export { passport };
