import chai from 'chai';
import sinon from 'sinon';
import * as JWT from 'jsonwebtoken';
import sendGrid from '@sendgrid/mail';

import server from '../src/app';
import { User } from '../src/models/user';
import { newUser } from './helpers/mockData';

const { expect } = chai;

describe('/PUT verify-email', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should successfully verify email', async () => {
    sandBox.stub(JWT, 'verify').returns({ sub: 1 });
    sandBox.stub(User, 'findOne').returns(newUser);

    const response = await chai
      .request(server)
      .put('/api/v1/verify-email')
      .query({ code: 'tokenhwhwjwjjnjsjanjas' });
    expect(response).to.have.status(201);
  });

  it('[/POST auth/resend] should be successful.', async () => {
    sandBox.stub(User, 'findOne').returns(newUser);
    sandBox.stub(sendGrid, 'send').resolves({});

    const response = await chai
      .request(server)
      .post('/api/v1/auth/resend')
      .send({ email: 'testuser@test.com' });
    expect(response).to.have.status(200);
  });

  it('[/POST auth/resend] should validate params.', async () => {
    sandBox.stub(User, 'findOne').returns(newUser);
    sandBox.stub(sendGrid, 'send').resolves({});

    const response = await chai
      .request(server)
      .post('/api/v1/auth/resend')
      .send({});
    expect(response).to.have.status(400);
  });
});
