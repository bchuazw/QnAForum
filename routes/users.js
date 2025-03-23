// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const requireLogin = require('../middlewares/requireLogin');

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

// GET /users/profile (protected route)
router.get('/profile', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/users/login');

  // Aggregate question votes
  const questionVotesAggregate = await Question.aggregate([
    { $match: { author: user._id } },
    { $group: { _id: null, totalVotes: { $sum: '$votes' } } }
  ]);
  // Aggregate answer votes
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

// GET /users - redirect to /users/list so we don't get "Cannot GET /users"
router.get('/', (req, res) => {
  return res.redirect('/users/list');
});

// GET /users/list - Show all users with profile pic & reputation
router.get('/list', async (req, res) => {
  try {
    // 1) Aggregate question votes grouped by author
    const questionAgg = await Question.aggregate([
      { $group: { _id: '$author', totalQVotes: { $sum: '$votes' } } }
    ]);

    // 2) Aggregate answer votes grouped by author
    const answerAgg = await Answer.aggregate([
      { $group: { _id: '$author', totalAVotes: { $sum: '$votes' } } }
    ]);

    // Convert these aggregates into dictionaries for quick lookup
    const questionMap = {};
    questionAgg.forEach((q) => {
      questionMap[q._id.toString()] = q.totalQVotes;
    });

    const answerMap = {};
    answerAgg.forEach((a) => {
      answerMap[a._id.toString()] = a.totalAVotes;
    });

    // 3) Fetch all users
    const allUsers = await User.find({});

    // 4) Build an array of user objects with computed reputation
    const usersData = allUsers.map((u) => {
      const qScore = questionMap[u._id.toString()] || 0;
      const aScore = answerMap[u._id.toString()] || 0;
      const reputation = qScore + aScore;
      return {
        user: u,
        reputation
      };
    });

    // 5) Sort by reputation descending
    usersData.sort((a, b) => b.reputation - a.reputation);

    // 6) Pass currentUser so the layout can display the correct navbar
    res.render('users/UsersIndex', {
      usersData,
      currentUser: res.locals.currentUser
    });
  } catch (err) {
    console.error('Error fetching users list:', err);
    res.status(500).send('Error fetching users list');
  }
});

// GET /users/:id - Show a single user's public profile
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    // Fetch the user doc
    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return res.status(404).send('User not found');
    }

    // Aggregate question votes
    const questionAgg = await Question.aggregate([
      { $match: { author: userDoc._id } },
      { $group: { _id: null, totalQVotes: { $sum: '$votes' } } }
    ]);
    // Aggregate answer votes
    const answerAgg = await Answer.aggregate([
      { $match: { author: userDoc._id } },
      { $group: { _id: null, totalAVotes: { $sum: '$votes' } } }
    ]);
    const qScore = questionAgg.length > 0 ? questionAgg[0].totalQVotes : 0;
    const aScore = answerAgg.length > 0 ? answerAgg[0].totalAVotes : 0;
    const reputation = qScore + aScore;

    // Fetch questions & answers for this user
    const userQuestions = await Question.find({ author: userDoc._id })
      .sort({ createdAt: -1 })
      .exec();
    const userAnswers = await Answer.find({ author: userDoc._id })
      .sort({ createdAt: -1 })
      .exec();

    // Pass currentUser so Layout can detect login, plus the new data
    res.render('users/PublicProfile', {
      user: userDoc,
      userQuestions,
      userAnswers,
      reputation,
      currentUser: res.locals.currentUser
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error fetching user');
  }
});

module.exports = router;
