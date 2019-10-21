import { User } from '../../models/user';
import { Actions } from '../../helpers/actions';
import { signToken, decodeToken } from '../../helpers/jwt';
import { sendMail, verificationEmail } from '../../helpers/mailer';

export default class AuthController {
  // eslint-disable-next-line consistent-return
  static signUp = async (req, res) => {
    const { email } = req.body;
    const users = await User.findAll({ where: { email } });
    if (users.length) {
      return res.status(400).json({ errors: ['Email already in use.'] });
    }
    const user = await Actions.addData(User, req.body, [
      'id',
      'firstname',
      'lastname',
      'email',
      'password',
    ]);
    const token = signToken(user.id);
    const emailBody = verificationEmail(user, token);

    sendMail(emailBody, 'Verification', res);
  };

  static verifyEmail = async (req, res) => {
    const userId = decodeToken(req.query.code);
    const user = await Actions.findData(User, { id: userId });
    if (user) {
      await user.update({ verified: true });
      return res
        .status(200)
        .json({ message: 'Emails successfully verified. You can now log in.' });
    }
    return res.status(500).json({ message: 'An error occurred. Try again.' });
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    const user = await Actions.findData(User, { email });
    if (!user) {
      return res.status(404).json({ Errors: "User doesn't exist." });
    }
    if (!user.verified) {
      return res.status(403).json({
        Errors: 'Please verify your email. Check your inbox for the link.',
      });
    }
    const validPassword = await user.validatePassword(password);
    return validPassword
      ? res.status(200).json({
        success: 'Successfully logged in',
        token: signToken(user.id),
      })
      : res.status(400).json({ Errors: 'Email or Password is invalid.' });
  };
}
