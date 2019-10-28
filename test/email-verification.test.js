import chai from 'chai';
import sinon from 'sinon';
import * as JWT from 'jsonwebtoken';
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

    const response = await chai.request(server)
      .put('/api/v1/verify-email')
      .query({ code: 'tokenhwhwjwjjnjsjanjas' });
    expect(response).to.have.status(200);
  });
});
