import router from 'express-promise-router';
import { userRoutes } from './user';
import { articleRoutes } from './article';

export const routes = () => {
  const route = router();

  userRoutes(route);
  articleRoutes(route);

  return route;
};
