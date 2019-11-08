import { Sequelize } from 'sequelize';
import connection from '.';

export const Article = connection.define(
  'Article',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    body: Sequelize.TEXT,
    slug: Sequelize.STRING,
    author_id: Sequelize.STRING,
  },
  {
    timestamps: true,
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
  },
);
