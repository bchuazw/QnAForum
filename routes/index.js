// routes/index.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  try {
    // get top 3 by votes descending
    const topQuestions = await Question.find({})
      .sort({ votes: -1 })
      .limit(3)
      .exec();

    res.render('Home', {
      title: 'Welcome to My Q&A Forum',
      currentUser: res.locals.currentUser,
      topQuestions
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error loading homepage');
  }
});

module.exports = router;
