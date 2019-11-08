import { Sequelize } from 'sequelize';
import connection from '.';

export const ArticleImage = connection.define(
  'ArticleImage',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: Sequelize.STRING,
    article_id: Sequelize.STRING,
  },
  {
    timestamps: true,
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
  },
);
