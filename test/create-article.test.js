import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import server from '../src/app';
import { Article } from '../src/models/article';
import {
  mockArticleData,
  mockArticleImages,
  newArticle,
  newUser,
  claudinaryPhotos,
  newArticleWithNoTitle,
  newArticleWithNoImages
} from './helpers/mockData';
import { ArticleImage } from '../src/models/article-image';
import { User } from '../src/models/user';
import { ImageUpload } from '../src/helpers/image-upload';

chai.use(chaiHttp);
const { expect } = chai;
describe('Create article route', () => {
  let sandBox;
  let login;
  beforeEach( async () => {
    sandBox = sinon.createSandbox();
    sandBox.stub(User, 'findOne').returns(newUser);
    login = await chai
      .request(server)
      .post('/api/v1/login')
      .send({ email: 'testuser@test.com', password: 'testpass' });
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should post new article', async () => {
    sandBox.stub(Article, 'create').returns(mockArticleData);
    sandBox.stub(ArticleImage, 'bulkCreate').returns(mockArticleImages);
    sandBox.stub(ImageUpload, 'uploadImages').returns(claudinaryPhotos);

    const createArticle = await chai.request(server)
      .post('/api/v1/article')
      .set({ Authorization: `Bearer ${login.body.token}` })
      .send(newArticle);
    expect(createArticle).to.have.status(201);
  });

  it('should failed to post an article when not logged-in', async () => {
    const createArticle = await chai.request(server)
      .post('/api/v1/article')
      .send(newArticle);
    expect(createArticle).to.have.status(401);
  });

  it('should not post an article with no title', async () => {
    const createArticle = await chai.request(server)
      .post('/api/v1/article')
      .set({ Authorization: `Bearer ${login.body.token}` })
      .send(newArticleWithNoTitle);

    expect(createArticle).to.have.status(400);
  });

  it('should post an article with no images', async () => {
    sandBox.stub(Article, 'create').returns(mockArticleData);
    const createArticle = await chai.request(server)
      .post('/api/v1/article')
      .set({ Authorization: `Bearer ${login.body.token}` })
      .send(newArticleWithNoImages);

    expect(createArticle).to.have.status(201);
  });

});
