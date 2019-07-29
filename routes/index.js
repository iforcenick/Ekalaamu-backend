import router from 'express-promise-router';
import cors from 'cors';
import { userRoutes } from './user';



export const routes = () => {
  const route = router();
  
  userRoutes(route);

  return route;
}