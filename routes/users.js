// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const requireLogin = require('../middlewares/requireLogin');
 
// No need to require Multer for profile picture uploads now
// const upload = require('../middlewares/upload'); 

// GET /users/register
router.get('/register', (req, res) => {
  res.render('users/Register', { errorMsg: null });
});

// POST /users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    req.session.userId = newUser._id;
    return res.redirect('/');
  } catch (err) {
    console.error('Registration error:', err);
    let errorMsg = 'Error registering user. Please check your input.';
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      errorMsg = messages.join(' ');
    } else if (err.code === 11000) {
      if (err.keyValue.username) {
        errorMsg = 'Username is already taken.';
      } else if (err.keyValue.email) {
        errorMsg = 'Email is already in use.';
      }
    }
    return res.render('users/Register', { errorMsg });
  }
});

// GET /users/login
router.get('/login', (req, res) => {
  res.render('users/Login', { errorMsg: null });
});

// POST /users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.render('users/Login', {
        errorMsg: 'Invalid credentials. Please check your email or password.'
      });
    }
    console.log('Logged in as:', user.username);
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error logging in');
  }
});

// GET /users/logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

/// GET /users/profile (protected route)
router.get('/profile', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/users/login');

  // Aggregate the net vote count for the user's questions.
  const questionVotesAggregate = await Question.aggregate([
    { $match: { author: user._id } },
    { $group: { _id: null, totalVotes: { $sum: '$votes' } } }
  ]);
  // Aggregate the net vote count for the user's answers.
  const answerVotesAggregate = await Answer.aggregate([
    { $match: { author: user._id } },
    { $group: { _id: null, totalVotes: { $sum: '$votes' } } }
  ]);
  const qScore = questionVotesAggregate.length > 0 ? questionVotesAggregate[0].totalVotes : 0;
  const aScore = answerVotesAggregate.length > 0 ? answerVotesAggregate[0].totalVotes : 0;
  const reputation = qScore + aScore;

  // Fetch all questions and answers for this user (history)
  const userQuestions = await Question.find({ author: user._id }).sort({ createdAt: -1 }).exec();
  const userAnswers = await Answer.find({ author: user._id }).sort({ createdAt: -1 }).exec();

  res.render('users/Profile', {
    user,
    currentUser: user,
    questionsCount: qScore,
    answersCount: aScore,
    reputation,
    userQuestions,
    userAnswers
  });
});

// GET /users/profile/edit (protected route)
router.get('/profile/edit', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/users/login');
  res.render('users/ProfileEdit', { user, currentUser: user });
});

// POST /users/profile/edit (protected route)
router.post('/profile/edit', requireLogin, async (req, res) => {
  const { username, email, password, bio, profilePic } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.session.userId,
      { username, email, password, bio, profilePic },
      { new: true }
    );
    if (!updated) return res.redirect('/users/login');
    res.redirect('/users/profile');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating profile');
  }
});

module.exports = router;
