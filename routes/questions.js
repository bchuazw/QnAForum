// routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const requireLogin = require('../middlewares/requireLogin');

// GET /questions
router.get('/', async (req, res) => {
  const sort = req.query.sort || 'newest';
  let sortObj = {};
  if (sort === 'newest') sortObj = { createdAt: -1 };
  if (sort === 'active') sortObj = { updatedAt: -1 };

  const questions = await Question.find({})
    .populate('author')
    .populate('answersCount')
    .sort(sortObj)
    .exec();

  res.render('questions/Index', { questions });
});

// GET /questions/ask => must be logged in
router.get('/ask', requireLogin, (req, res) => {
  // Pass currentUser from res.locals so the Ask page can forward it to Layout
  res.render('questions/Ask', { currentUser: res.locals.currentUser });
});

// POST /questions => must be logged in
router.post('/', requireLogin, async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const question = new Question({
      title,
      body,
      tags: tags.split(',').map(t => t.trim()),
      author: req.session.userId
    });
    await question.save();
    res.redirect('/questions');
  } catch (err) {
    console.log(err);
    res.status(400).send('Error creating question');
  }
});

// GET /questions/:id
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author')
      .exec();
    const answers = await Answer.find({ question: question._id })
      .populate('author')
      .sort({ votes: -1 })
      .exec();
    res.render('questions/Show', { question, answers });
  } catch (err) {
    res.status(404).send('Question not found');
  }
});

// POST /questions/:id/vote
router.post('/:id/vote', async (req, res) => {
  try {
    const { voteType } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).send('No question');

    if (voteType === 'up') question.votes += 1;
    else if (voteType === 'down') question.votes -= 1;

    await question.save();
    res.redirect(`/questions/${question._id}`);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error voting');
  }
});

module.exports = router;
