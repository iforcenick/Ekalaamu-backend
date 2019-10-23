import passport from 'passport';
import AuthController from '../controllers/user/auth';
import { authValidator } from '../middleware/validation';

const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });
const passportTwitter = passport.authenticate('twitterToken', { session: false });

export const userRoutes = (router) => {
  router.route('/signup').post(authValidator('signup'), AuthController.signUp);
  router.route('/login').post(authValidator('login'), AuthController.login);
  router.route('/verify-email').put(AuthController.verifyEmail);
  router.route('/google').post(passportGoogle, AuthController.googleAuth);
  router.route('/facebook').post(passportFacebook, AuthController.facebookAuth);
  router.route('/twitter').post(passportTwitter, AuthController.twitterAuth);
  router.route('/auth/resend').post(authValidator('resendEmail'), AuthController.resendLink);
};
