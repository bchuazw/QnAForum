// server.js
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const reactViews = require('express-react-views');

// Import the User model
const User = require('./models/User');

// Routes
const indexRoutes = require('./routes/index');
const questionRoutes = require('./routes/questions');
const userRoutes = require('./routes/users');
const answerRoutes = require('./routes/answers');

const app = express();

// ---------- MongoDB Connection ----------
mongoose.connect('mongodb://localhost:27017/qaforum')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ---------- View Engine (JSX) ----------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

// ---------- Middlewares ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, images) from /public
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secretKey', // CHANGE THIS FOR PRODUCTION
  resave: false,
  saveUninitialized: true
}));

// OPTIONAL: Remove if you prefer the second one only
// app.use((req, res, next) => {
//   res.locals.currentUserId = req.session.userId || null;
//   next();
// });

// This middleware loads the entire User object
app.use(async (req, res, next) => {
  //console.log('Session userId before DB lookup:', req.session.userId);
  //console.log('res.locals.currentUser before assignment:', res.locals.currentUser);

  if (req.session.userId) {
    const user = await User.findById(req.session.userId).exec();
    res.locals.currentUser = user;
  } else {
    res.locals.currentUser = null;
  }

  // confirm the final value
  //console.log('res.locals.currentUser after assignment:', res.locals.currentUser);

  next();
});

// ---------- Mount Routes ----------
app.use('/', indexRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);
app.use('/users', userRoutes);

// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
