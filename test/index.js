import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/app';
import { User } from '../src/models/user';
import { sendMail } from '../src/helpers/mailer';

import authSpec from './auth.test';

const { expect } = chai;
chai.use(chaiHttp);

describe('Specs', () => {
  authSpec(server, expect, User);
});
