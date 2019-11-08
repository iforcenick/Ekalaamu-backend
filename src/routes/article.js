import CreateArticle from '../controllers/article/create-article';
import { requireSignIn } from '../helpers/jwt';
import { authValidator } from '../middleware/validation';

export const articleRoutes = (router) => {
  router.route('/article').post(requireSignIn, authValidator('create-article'), CreateArticle.postArticle);
};
