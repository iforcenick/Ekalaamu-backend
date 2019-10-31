import Slug from 'slug';
import unique from 'unique-keygen';
import { Article } from '../../models/article';
import { Actions } from '../../helpers/actions';
import { checkErrors } from '../../middleware/validation';
import { ImageUpload } from '../../helpers/image-upload';
import { ArticleImage } from '../../models/article-image';

class CreateArticle {
  static postArticle = async (req, res, next) => {
    const imageData = [];
    const { body, auth } = req;
    const errors = checkErrors(req);
    if (errors) {
      return res.status(400).send({ errors });
    }
    const slug = Slug(`${body.title} ${unique(5)}`, '_');
    try {
      const response1 = await Actions.addData(
        Article, Object.assign(body, { author_id: auth.sub, slug }),
        [
          'title',
          'description',
          'body',
          'slug',
          'author_id',
        ],
      );

      if (body.filePath) {
        const result = await ImageUpload.uploadImages(body.filePath);
        result.forEach((image) => {
          imageData.push({ image_url: image.secure_url, article_id: response1.dataValues.id });
        });
        const response2 = await ArticleImage.bulkCreate(imageData);
        return res.status(201).send({ articleData: response1, imagesAttached: response2 });
      }


      return res.status(201).send({ articleData: response1 });
    } catch (e) {
      return next(e);
    }
  }
}

export default CreateArticle;
