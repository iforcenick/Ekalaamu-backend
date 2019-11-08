const newUser = {
  id: 12,
  firstname: 'testFistname',
  email: 'testuser@dev.com',
  verified: true,
  update: async () => null,
  validatePassword: async () => true,
};

const signupData = {
  firstname: 'testFirstname',
  lastname: 'testLastname',
  email: 'testuser@dev.com',
  password: 'testpassword',
};

const newArticle = {
  title: 'Root cause analysis',
  description: 'Exploring what exactly root cause analysis is',
  body: 'Root cause analysis is an approach for identifying the underlying causes'
    + ' of an incident so that the most effective solutions can be identified and implemented. '
    + 'It’s typically used when something goes badly, but can also be used when something goes well. '
    + 'Within an organization, problem solving, incident investigation, and root cause analysis are all '
    + 'fundamentally connected by three basic questions:',
  filePath: [
    '/Users/arnold/Github-repos/node-backend-Ekalaamu/test/IMG_20190907_102217.jpg',
    '/Users/arnold/Github-repos/node-backend-Ekalaamu/test/20160611AndelaOne242.jpg',
  ],
};

const newArticleWithNoTitle = {
  title: '',
  description: 'Exploring what exactly root cause analysis is',
  body: 'Root cause analysis is an approach for identifying the underlying causes'
    + ' of an incident so that the most effective solutions can be identified and implemented. '
    + 'It’s typically used when something goes badly, but can also be used when something goes well. '
    + 'Within an organization, problem solving, incident investigation, and root cause analysis are all '
    + 'fundamentally connected by three basic questions:',
  filePath: [
    '/Users/arnold/Github-repos/node-backend-Ekalaamu/test/IMG_20190907_102217.jpg',
    '/Users/arnold/Github-repos/node-backend-Ekalaamu/test/20160611AndelaOne242.jpg',
  ],
};

const newArticleWithNoImages = {
  title: 'Root cause analysis',
  description: 'Exploring what exactly root cause analysis is',
  body: 'Root cause analysis is an approach for identifying the underlying causes'
    + ' of an incident so that the most effective solutions can be identified and implemented. '
    + 'It’s typically used when something goes badly, but can also be used when something goes well. '
    + 'Within an organization, problem solving, incident investigation, and root cause analysis are all '
    + 'fundamentally connected by three basic questions:',
};

const mockArticleData = {
  dataValues: {
    id: 1,
    title: 'Root cause analysis',
    description: 'Exploring what exactly root cause analysis is',
    body:
      'Root cause analysis is an approach for identifying the underlying causes of an incident so that the most effective solutions can be identified and implemented. It’s typically used when something goes badly, but can also be used when something goes well. Within an organization, problem solving, incident investigation, and root cause analysis are all fundamentally connected by three basic questions:',
    slug: 'Root_cause_analysis_6nfdj',
    author_id:
      '$2a$08$Woeg2Eck0XsFb8ut7ySfoOfYRF47TIaZBtSu4feCNt87l6dXr9hJa',
    updatedOn: '2019-11-07T06:07:29.464Z',
    createdOn: '2019-11-07T06:07:29.464Z',
  },
};

const mockArticleImages = {
  id: 1,
  image_url:
    '/Users/arnold/Github-repos/node-backend-Ekalaamu/test/IMG_20190907_102217.jpg',
  article_id: '1',
  createdOn: '2019-11-07T06:10:14.584Z',
  updatedOn: '2019-11-07T06:10:14.584Z',
};

const mockArticleResponse = {
  articleData: {
    id: 1,
    title: 'Root cause analysis',
    description: 'Exploring what exactly root cause analysis is',
    body: 'Root cause analysis is an approach for identifying the underlying causes of an incident so that the most effective solutions can be identified and implemented. It’s typically used when something goes badly, but can also be used when something goes well. Within an organization, problem solving, incident investigation, and root cause analysis are all fundamentally connected by three basic questions:',
    slug: 'Root_cause_analysis_m60p3',
    author_id: '$2a$08$Woeg2Eck0XsFb8ut7ySfoOfYRF47TIaZBtSu4feCNt87l6dXr9hJa',
    updatedOn: '2019-11-07T03:19:45.007Z',
    createdOn: '2019-11-07T03:19:45.007Z',
  },

  imagesAttached: [
    {
      id: 1,
      image_url: '/Users/arnold/Github-repos/node-backend-Ekalaamu/test/IMG_20190907_102217.jpg',
      article_id: '1',
      createdOn: '2019-11-07T03:19:52.984Z',
      updatedOn: '2019-11-07T03:19:52.984Z',
    },
    {
      id: 2,
      image_url: '/Users/arnold/Github-repos/node-backend-Ekalaamu/test/20160611AndelaOne242.jpg',
      article_id: '1',
      createdOn: '2019-11-07T03:19:52.984Z',
      updatedOn: '2019-11-07T03:19:52.984Z',
    },
  ],
};

const claudinaryPhotos = [{
  public_id: 'xp7rpmprtzgc8mq5px8e',
  version: 1573108169,
  signature: 'fb45af8704d36f39ab7f0c52027d0f6bc9523e25',
  width: 3264,
  height: 2448,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2019-11-07T06:29:29Z',
  tags: [],
  bytes: 272302,
  type: 'upload',
  etag: '25111849f179fe82ecf99bccd7b5932d',
  placeholder: false,
  url:
    'http://res.cloudinary.com/katunold/image/upload/v1573108169/xp7rpmprtzgc8mq5px8e.jpg',
  secure_url:
    'https://res.cloudinary.com/katunold/image/upload/v1573108169/xp7rpmprtzgc8mq5px8e.jpg',
  original_filename: 'IMG_20190907_102217',
},
{
  public_id: 'cdmhex62cshcenzallqs',
  version: 1573108172,
  signature: '9a049deb098b61d09fe27afcc76a970238104e42',
  width: 2500,
  height: 1667,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2019-11-07T06:29:32Z',
  tags: [],
  bytes: 497608,
  type: 'upload',
  etag: '7ed82ec2d313aaf5634190bd5cfec724',
  placeholder: false,
  url:
      'http://res.cloudinary.com/katunold/image/upload/v1573108172/cdmhex62cshcenzallqs.jpg',
  secure_url:
      'https://res.cloudinary.com/katunold/image/upload/v1573108172/cdmhex62cshcenzallqs.jpg',
  original_filename: '20160611AndelaOne242',
}];

export {
  newUser, signupData, newArticle, mockArticleResponse, mockArticleData, mockArticleImages, claudinaryPhotos,
  newArticleWithNoTitle, newArticleWithNoImages,
};
