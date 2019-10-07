import chai from 'chai';
import sinon from 'sinon';

// Imports for stubing
import sendGrid from "@sendgrid/mail";
import * as JWT from 'jsonwebtoken';


import { newUser, signupData } from './helpers/mockData';
import { dataTestCase } from './helpers';

export default (server, expect, model) => describe('Authentication', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  it('[/POST signup] should be successful', done => {
    sandbox.stub(model, 'findAll').resolves([]);
    sandbox.stub(model, 'create').returns(newUser);
    sandbox.stub(sendGrid, 'send').resolves({});

    dataTestCase(server, '/api/v1/signup', signupData)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('[/POST signup] fail to send email', done => {
    sandbox.stub(model, 'findAll').resolves([]);
    sandbox.stub(model, 'create').returns(newUser);
    sandbox.stub(sendGrid, 'send').rejects({});

    dataTestCase(server, '/api/v1/signup', signupData)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  it('[/POST signup] should not register user more than once.', done => {
    sandbox.stub(model, 'findAll').returns([{}]);

    dataTestCase(server, '/api/v1/signup', signupData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('[/PUT /verify-email] should be successful', done => {
    sandbox.stub(JWT, 'verify').returns({ sub: 1 });
    sandbox.stub(model, 'findOne').returns(newUser);

    chai
      .request(server)
      .put('/api/v1/verify-email')
      .query({ code: 'tokenhwhwjwjjnjsjanjas' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('[/POST login] should be successful.', done => {
    sandbox.stub(model, 'findOne').returns(newUser);

    dataTestCase(server, '/api/v1/login', { email: 'testuser', password: 'testpass'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('[/POST login] should not login non-existent user.', done => {
    sandbox.stub(model, 'findOne').returns(null);

    dataTestCase(server, '/api/v1/login', { email: 'testuser', password: 'testpass'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('[/POST login] should not login un-verified user.', done => {
    sandbox.stub(model, 'findOne').returns({ verified: false });

    dataTestCase(server, '/api/v1/login', { email: 'testuser', password: 'testpass'})
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});