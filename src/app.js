import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import db from './models/index';
import config from './config/config';
import passport from './config/passport-config';

dotenv.config();
passport;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Test DB connection

  if (process.env.NODE_ENV === 'dev') {
    db.authenticate()
      .then(() => {
        console.log(`successfully connected to the ${process.env.DATABASE} `);
        // db.sync({ force: true, logging: false });
      })
      .catch((err) => console.log(`Error${err}`));
  }


// All routes
app.use('/api/v1', routes());

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ UnauthorizedError: err.message });
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Ekalaamu!');
});

const PORT = config.app.port;

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));

export default app;
