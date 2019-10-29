import chai from 'chai';
import sinon from 'sinon';
import server from '../src/app';
import { User } from '../src/models/user';
import { newUser } from './helpers/mockData';

const { expect } = chai;

describe('Login route', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should successfully login a user', async () => {
    sandBox.stub(User, 'findOne').returns(newUser);
    const response = await chai
      .request(server)
      .post('/api/v1/login')
      .send({ email: 'testuser@test.com', password: 'testpass' });
    expect(response).to.have.status(200);
  });

  it('should not login non existent user', async () => {
    sandBox.stub(User, 'findOne').returns(null);

    const response = await chai
      .request(server)
      .post('/api/v1/login')
      .send({ email: 'testuser@test.com', password: 'testpass' });
    expect(response).to.have.status(404);
  });

  it('should not login un-verified user', async () => {
    sandBox.stub(User, 'findOne').returns({ verified: false });

    const response = await chai
      .request(server)
      .post('/api/v1/login')
      .send({ email: 'testuser@test.com', password: 'testpass' });
    expect(response).to.have.status(403);
  });
});
