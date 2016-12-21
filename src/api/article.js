import { Router } from 'express';

import models from '../models';

const Article = models.article;
const Tag = models.tag;
const ArticleTag = models.article_tags;

const articleRouter = new Router();


articleRouter.get('/', async (req, res) => {
  try {
    let articles = await Article.all();
    articles = articles.map(async article => {
      let tags;
      try {
        tags = await ArticleTag.findAll({ where: { articleId: article.id } });
      } catch (err) {
        console.log(err);
      }
      article.tags = tags;
      return article;
    });
    res.json(articles);
  } catch (err) {
    console.error(err);
  }
});

articleRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  res.json(article);
});

articleRouter.post('/', async (req, res) => {
  const { userId, title, content, tags } = req.body;
  console.log(`user id: ${userId}`);
  let article;
  try {
    article = await Article.create({
      title,
      content,
      userId,
    });
  } catch (err) {
    console.log('error while creating articles');
    console.log(err);
  }

  for (let i = 0; i < tags.length; i += 1) {
    const [tag] = await Tag.findOrCreate({
      where: {
        name: tags[i],
      },
    });

    await ArticleTag.create({
      articleId: article.id,
      tagId: tag.id,
    });
  }

  res.json(article);
});

articleRouter.put('/:id', async (req, res) => {
  const { title, content, tags } = req.body;
  const id = req.params.id;
  await Article.update({
    title,
    content,
  }, {
    where: {
      id,
    },
  });

  const article = await Article.findById(id);

  for (let i = 0; i < tags.length; i += 1) {
    const [tag] = await Tag.findOrCreate({
      where: {
        name: tags[i],
      },
    });

    await ArticleTag.findOrCreate({
      where: {
        articleId: article.id,
        tagId: tag.id,
      },
    });
  }

  res.json(article);
});

articleRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await Article.destroy({
    where: {
      id,
    },
  });

  res.json({
    deletedId: +id,
  });
});

export default articleRouter;
