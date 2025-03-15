const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('Home', { title: 'Welcome to My Q&A Forum' , currentUser: res.locals.currentUser});
});

module.exports = router;
