const { Card, User } = require('../models');
const { auth, isAuth } = require('./auth');

module.exports = {
  card: async (req, res, next) => {
    try {
      const userInfo = await isAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '로그인 하셔야합니다.' });
      }
      const newCard = await Card.create({
        question: req.body.question,
        answer: req.body.answer,
        UserId: req.body.userId,
      });

      const fullCard = await Card.findOne({
        where: {
          id: newCard.dataValues.id,
        },
        attributes: ['id', 'question', 'answer'],
        include: [
          {
            model: User,
            as: 'Likers',
            attributes: ['id'],
          },
          {
            model: User,
            attributes: ['id', 'username'],
          },
        ],
      });
      return res.status(201).json(fullCard);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  shareCard: async (req, res, next) => {
    try {
      const userInfo = await isAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '로그인 하셔야합니다.' });
      }

      const card = await Card.findOne({
        where: {
          id: req.params.cardId,
        },
      });

      if (!card) {
        return res.status(403).send('공유할려는 카드가 존재하지 않습니다');
      }
      await card.addSharing(userInfo.dataValues.id);
      const fullCard = await Card.findOne({
        where: {
          id: req.params.cardId,
        },
        attributes: ['id', 'question', 'answer'],
        include: [
          {
            model: User,
            as: 'Likers',
            attributes: ['id'],
          },
          {
            model: User,
            attributes: ['id', 'username'],
          },
        ],
      });
      return res.status(200).json(fullCard);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  unShareCard: async (req, res, next) => {
    try {
      const userInfo = await isAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '로그인 하셔야합니다.' });
      }

      const card = await Card.findOne({
        where: { id: req.params.cardId },
      });
      if (!card) {
        return res.status(403).send('공유취소 할려는 카드가 존재하지 않습니다');
      }
      await card.removeSharing(userInfo.dataValues.id);
      return res.status(200).json({ cardId: Number(card.dataValues.id) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  like: async (req, res, next) => {
    try {
      // 로그인이 되었는지 아닌지 확인..
      const userInfo = await isAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '로그인 하셔야합니다.' });
      }
      const like = await Card.findOne({
        where: {
          id: req.params.cardId,
        },
      });
      if (!like) {
        return res.status(403).send('좋아요가 존재하지 않습니다.');
      }
      await like.addLikers(userInfo.dataValues.id);
      return res.status(200).json({
        CardId: Number(req.params.cardId),
        UserId: Number(userInfo.dataValues.id),
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  dislike: async (req, res, next) => {
    try {
      const userInfo = await isAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '로그인 하셔야합니다.' });
      }
      const dislike = await Card.findOne({
        where: {
          id: req.params.cardId,
        },
      });
      if (!dislike) {
        return res.status(403).send('싫어요가 존재하지 않습니다.');
      }
      await dislike.removeLikers(userInfo.dataValues.id);
      return res.status(200).json({
        CardId: Number(req.params.cardId),
        UserId: Number(userInfo.dataValues.id),
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  deleteCard: async (req, res, next) => {
    try {
      const userInfo = await isAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '로그인 하셔야합니다.' });
      }
      console.log(req.params.cardId);
      const card = await Card.destroy({
        where: {
          id: req.params.cardId,
          UserId: userInfo.dataValues.id,
        },
      });
      if (!card) {
        return res.status(403).send('카드가 존재하지 않습니다.');
      }
      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'server error' });
      next(error);
    }
  },

  editCard: async (req, res, next) => {
    try {
      const userInfo = await isAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '로그인 하셔야합니다.' });
      }
      const { question, answer, cardId } = req.body;
      await Card.update(
        {
          question,
          answer,
        },
        {
          where: {
            id: cardId,
          },
        },
      );
      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'server error' });
      next(error);
    }
  },
};
