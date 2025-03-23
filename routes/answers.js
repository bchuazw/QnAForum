// routes/answers.js
const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const requireLogin = require('../middlewares/requireLogin');

// POST /answers/:id/vote - Toggleable up/down vote for answers
router.post('/:id/vote', requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body;
    const voteValue = voteType === 'up' ? 1 : voteType === 'down' ? -1 : 0;
    if (voteValue === 0) return res.redirect('back');

    const answer = await Answer.findById(id);
    if (!answer) return res.status(404).send('Answer not found');

    const existingIndex = answer.voters.findIndex(
      v => v.user.toString() === req.session.userId.toString()
    );

    if (existingIndex === -1) {
      answer.voters.push({ user: req.session.userId, vote: voteValue });
      answer.votes += voteValue;
    } else {
      const existingVote = answer.voters[existingIndex].vote;
      if (existingVote === voteValue) {
        return res.redirect('back');
      } else {
        answer.voters[existingIndex].vote = voteValue;
        answer.votes += (voteValue - existingVote);
      }
    }

    await answer.save();
    res.redirect('back');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error voting on answer');
  }
});

// GET /answers/:id/edit - Show edit form if current user is the author
router.get('/:id/edit', requireLogin, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate('author');
    if (!answer) return res.status(404).send('Answer not found');

    if (answer.author._id.toString() !== req.session.userId.toString()) {
      return res.status(403).send('Forbidden');
    }

    res.render('answers/Edit', { answer, currentUser: res.locals.currentUser });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error fetching answer for edit');
  }
});

// POST /answers/:id/edit - Update answer if current user is the author
router.post('/:id/edit', requireLogin, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate('author');
    if (!answer) return res.status(404).send('Answer not found');

    if (answer.author._id.toString() !== req.session.userId.toString()) {
      return res.status(403).send('Forbidden');
    }

    const { body } = req.body;
    if (!body || !body.trim()) {
      return res.render('answers/Edit', {
        answer,
        currentUser: res.locals.currentUser,
        errorMsg: 'Answer cannot be empty.'
      });
    }

    answer.body = body;
    await answer.save();
    res.redirect(`/questions/${answer.question}`);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating answer');
  }
});

// POST /answers/:id/delete - remove if user is author
router.post('/:id/delete', requireLogin, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate('author');
    if (!answer) return res.status(404).send('Answer not found');

    // Only allow deletion if the current user is the author of the answer
    if (answer.author._id.toString() !== req.session.userId.toString()) {
      return res.status(403).send('Forbidden');
    }

    const questionId = answer.question;
    
    // Delete the answer using findByIdAndDelete
    await Answer.findByIdAndDelete(answer._id);
    
    res.redirect(`/questions/${questionId}`);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error deleting answer');
  }
});

module.exports = router;
