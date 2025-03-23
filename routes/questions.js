// routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const requireLogin = require('../middlewares/requireLogin');

// GET /questions
router.get('/', async (req, res) => {
  try {
    const sort = req.query.sort || 'newest';
    let sortObj = {};

    if (sort === 'newest') {
      sortObj = { createdAt: -1 };
    } else if (sort === 'unanswered') {
      // Typically you'd filter or sort for unanswered. For now just sorting by createdAt as well:
      sortObj = { createdAt: -1 };
    } else if (sort === 'upvoted') {
      sortObj = { votes: -1 };
    } else {
      // fallback or 'active'
      sortObj = { updatedAt: -1 };
    }

    // 1) Fetch all questions with their author populated
    //    Using .lean() so we can directly attach custom fields to each question object
    const questions = await Question.find({})
      .populate('author')
      .sort(sortObj)
      .lean();

    // 2) For each question, count how many answers it has and store it in question.answersCount
    for (let q of questions) {
      const count = await Answer.countDocuments({ question: q._id });
      q.answersCount = count;
    }

    // 3) Render the Index.jsx page, passing questions and currentSort
    //    Also pass currentUser if you’re using that for your navbar, etc.
    res.render('questions/Index', {
      questions,
      currentSort: sort,
      currentUser: res.locals.currentUser
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).send('Error fetching questions');
  }
});

// GET /questions/ask => must be logged in
router.get('/ask', requireLogin, (req, res) => {
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

// GET /questions/:id - show a single question with its answers and answer count
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author')
      .exec();

    // Attach answersCount for the question
    const qCount = await Answer.countDocuments({ question: question._id });
    question._doc.answersCount = qCount;

    const answers = await Answer.find({ question: question._id })
      .populate('author')
      .sort({ votes: -1 })
      .exec();

    res.render('questions/Show', {
      question,
      answers,
      currentUser: res.locals.currentUser,
      errorMsg: null
    });
  } catch (err) {
    res.status(404).send('Question not found');
  }
});

// POST /questions/:id/vote - require login and toggle votes
router.post('/:id/vote', requireLogin, async (req, res) => {
  try {
    const { voteType } = req.body;
    const voteValue = voteType === 'up' ? 1 : voteType === 'down' ? -1 : 0;
    if (voteValue === 0) return res.redirect(`/questions/${req.params.id}`);

    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).send('Question not found');

    const existingVoteIndex = question.voters.findIndex(v =>
      v.user.toString() === req.session.userId.toString()
    );

    if (existingVoteIndex === -1) {
      question.voters.push({ user: req.session.userId, vote: voteValue });
      question.votes += voteValue;
    } else {
      const existingVote = question.voters[existingVoteIndex].vote;
      if (existingVote === voteValue) {
        return res.redirect(`/questions/${question._id}`);
      } else {
        question.voters[existingVoteIndex].vote = voteValue;
        question.votes += (voteValue - existingVote);
      }
    }

    await question.save();
    res.redirect(`/questions/${question._id}`);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error voting');
  }
});

// POST /questions/:id/answers => must be logged in
router.post('/:id/answers', requireLogin, async (req, res) => {
  try {
    const questionId = req.params.id;
    const { body } = req.body;

    if (!body || !body.trim()) {
      const question = await Question.findById(questionId).populate('author').exec();
      const answers = await Answer.find({ question: questionId })
        .populate('author')
        .sort({ votes: -1 })
        .exec();

      return res.render('questions/Show', {
        question,
        answers,
        currentUser: res.locals.currentUser,
        errorMsg: 'Answer cannot be empty.'
      });
    }

    const newAnswer = new Answer({
      body,
      question: questionId,
      author: req.session.userId
    });
    await newAnswer.save();

    res.redirect(`/questions/${questionId}`);
  } catch (err) {
    console.error(err);
    return res.status(400).send('Error posting answer');
  }
});

// GET /questions/:id/edit => show edit form if user is the author
router.get('/:id/edit', requireLogin, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('author');
    if (!question) return res.status(404).send('Question not found');

    if (question.author._id.toString() !== req.session.userId.toString()) {
      return res.status(403).send('Forbidden');
    }

    res.render('questions/Edit', { question, currentUser: res.locals.currentUser });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error loading edit form');
  }
});

// POST /questions/:id/edit => actually update the question in DB
router.post('/:id/edit', requireLogin, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('author');
    if (!question) return res.status(404).send('Question not found');

    if (question.author._id.toString() !== req.session.userId.toString()) {
      return res.status(403).send('Forbidden');
    }

    question.title = req.body.title;
    question.body = req.body.body;
    question.tags = req.body.tags.split(',').map(t => t.trim());
    await question.save();

    res.redirect(`/questions/${question._id}`);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating question');
  }
});

// POST /questions/:id/delete => remove question if user is author
router.post('/:id/delete', requireLogin, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('author');
    if (!question) return res.status(404).send('Question not found');

    if (question.author._id.toString() !== req.session.userId.toString()) {
      return res.status(403).send('Forbidden');
    }

    // Use findOneAndDelete so the pre hook runs
    await Question.findOneAndDelete({ _id: req.params.id });
    res.redirect('/questions');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error deleting question');
  }
});

module.exports = router;
