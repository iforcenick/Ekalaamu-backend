import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes';
import db from './models/index';
import config from '../config/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Test DB connection
db.authenticate()
  .then(() => {
    console.log(`successfully connected to the ${process.env.DATABASE} `);
    db.sync({ force: false, logging: true });
  })
  .catch((err) => console.log(`Error${err}`));

// All routes
app.use('/api/v1/', routes());

app.get('/', (req, res) => {
  res.send('Ekalaamu!');
});

const PORT = config.app.port;

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));

export default app;
