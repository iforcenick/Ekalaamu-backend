import chai from 'chai';
import sinon from 'sinon';
import sendGrid from '@sendgrid/mail';
import server from '../src/app';
import { User } from '../src/models/user';
import { newUser, signupData } from './helpers/mockData';

const { expect } = chai;

describe('/POST signup', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should be successful', async () => {
    sandBox.stub(User, 'findAll').returns([]);
    sandBox.stub(User, 'create').returns(newUser);
    sandBox.stub(sendGrid, 'send').resolves({});

    const response = await chai
      .request(server)
      .post('/api/v1/signup')
      .send(signupData);
    expect(response).to.have.status(200);
  });

  it('should fail to send email', async () => {
    sandBox.stub(User, 'findAll').returns([]);
    sandBox.stub(User, 'create').returns(newUser);
    sandBox.stub(sendGrid, 'send').throws(['something went wrong']);

    const response = await chai
      .request(server)
      .post('/api/v1/signup')
      .send(signupData);
    expect(response).to.have.status(500);
  });

  it('should not register a user more than once', async () => {
    sandBox.stub(User, 'findAll').returns([{}]);

    const response = await chai
      .request(server)
      .post('/api/v1/signup')
      .send(signupData);
    expect(response).to.have.status(400);
  });
});
