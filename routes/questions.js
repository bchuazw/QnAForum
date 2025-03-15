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

  if (sort === 'newest') {
    sortObj = { createdAt: -1 };
  } else if (sort === 'unanswered') {
    sortObj = { createdAt: -1 };
  } else if (sort === 'upvoted') {
    sortObj = { votes: -1 };
  } else {
    sortObj = { updatedAt: -1 };
  }

  // Add .populate('author') so you get the user doc, not just the ID
  const questions = await Question.find({})
    .populate('author')           // <-- THIS LINE
    .sort(sortObj)
    .exec();

  res.render('questions/Index', {
    questions,
    currentSort: sort
  });
});


// GET /questions/ask => must be logged in
router.get('/ask', requireLogin, (req, res) => {
  // pass currentUser
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

    // pass currentUser, plus optional errorMsg if you want to show errors
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

    // Check if this user has already voted
    const existingVoteIndex = question.voters.findIndex(v => 
      v.user.toString() === req.session.userId.toString()
    );

    if (existingVoteIndex === -1) {
      // No existing vote, add new vote
      question.voters.push({ user: req.session.userId, vote: voteValue });
      question.votes += voteValue;
    } else {
      const existingVote = question.voters[existingVoteIndex].vote;
      if (existingVote === voteValue) {
        // If user clicks the same vote, do nothing
        return res.redirect(`/questions/${question._id}`);
      } else {
        // User changes vote: update the vote and adjust net votes by the difference
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
    const { body } = req.body; // "body" is the text of the answer

    // If user left the body empty, re-render with an error message
    if (!body || !body.trim()) {
      // re-fetch question & answers to re-render Show page
      const question = await Question.findById(questionId).populate('author').exec();
      const answers = await Answer.find({ question: questionId }).populate('author').sort({ votes: -1 }).exec();

      return res.render('questions/Show', {
        question,
        answers,
        currentUser: res.locals.currentUser,
        errorMsg: 'Answer cannot be empty.'
      });
    }

    // Otherwise, create a new answer
    const newAnswer = new Answer({
      body,
      question: questionId,
      author: req.session.userId
    });
    await newAnswer.save();

    // Redirect back to the question page
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

    // Only the author can edit
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

    // Check if current user is the author
    if (question.author._id.toString() !== req.session.userId.toString()) {
      return res.status(403).send('Forbidden');
    }

    // Update fields
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

    await question.remove();
    res.redirect('/questions'); // or wherever you want to go after deleting
  } catch (err) {
    console.error(err);
    res.status(400).send('Error deleting question');
  }
});

module.exports = router;
