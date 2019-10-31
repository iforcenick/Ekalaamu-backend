import { User } from '../../models/user';
import { Actions } from '../../helpers/actions';
import { signToken, decodeToken, ONE_HOUR } from '../../helpers/jwt';
import { sendMail, verificationEmail } from '../../helpers/mailer';
import { checkErrors } from '../../middleware/validation';

export default class AuthController {
  // eslint-disable-next-line consistent-return
  static signUp = async (req, res) => {
    const errors = checkErrors(req);
    if (errors) {
      return res.status(400).json({ errors });
    }
    const { email } = req.body;
    const users = await User.findAll({ where: { email } });
    if (users.length) {
      return res.status(400).json({ errors: [{ error: 'Email already in use.' }] });
    }
    const user = await Actions.addData(User, Object.assign(req.body, { strategy: 'local' }), [
      'id',
      'firstname',
      'lastname',
      'email',
      'strategy',
      'password',
    ]);
    const token = signToken(user.id, ONE_HOUR);
    const emailBody = verificationEmail(user, token);

    sendMail(emailBody, 'Verification', res);
  };

  static verifyEmail = async (req, res) => {
    const userId = decodeToken(req.query.code);
    if (!userId) {
      return res.status(200).json({ errors: [{ error: 'Link has expired. Request for a new one.' }] });
    }
    const user = await Actions.findData(User, { id: userId });
    if (user) {
      await user.update({ verified: true });
      return res
        .status(201)
        .json({ message: 'Emails successfully verified. You can now log in.' });
    }
    return res.status(500).json({ errors: [{ error: 'An error occurred. Try again.' }] });
  };

  static resendLink = async (req, res) => {
    const errors = checkErrors(req);
    if (errors) {
      return res.status(400).json({ errors });
    }
    const { email } = req.body;
    const user = await Actions.findData(User, { email });
    if (!user) {
      return res.status(404).json({ errors: [{ error: "User doesn't exist." }] });
    }
    const token = signToken(user.id, ONE_HOUR);
    const emailBody = verificationEmail(user, token);
    sendMail(emailBody, 'Verification', res);
  };

  static login = async (req, res) => {
    const errors = checkErrors(req);
    if (errors) {
      return res.status(400).json({ errors });
    }
    const { email, password } = req.body;

    const user = await Actions.findData(User, { email });
    if (!user) {
      return res.status(404).json({ errors: [{ error: "User doesn't exist." }] });
    }
    if (!user.verified) {
      return res.status(403).json({
        errors: [{ error: 'Please verify your email. Check your inbox for the link.' }],
      });
    }
    const validPassword = await user.validatePassword(password);
    return validPassword
      ? res.status(200).json({
        success: 'Successfully logged in',
        token: signToken(user.id),
      })
      : res.status(400).json({ errors: [{ error: 'Email or Password is invalid.' }] });
  };

  static googleAuth = (req, res) => {
    this.auth(res, req.user);
  };

  static facebookAuth = (req, res) => {
    this.auth(res, req.user);
  };

  static twitterAuth = (req, res) => {
    this.auth(res, req.user);
  };

  static auth = (res, data) => {
    const { id, firstname } = data;
    return res.status(200).send({
      firstname,
      token: signToken(id),
    });
  }
}
