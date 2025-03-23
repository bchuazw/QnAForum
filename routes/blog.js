// routes/blog.js
const express = require('express');
const router = express.Router();

// Sample blog posts in-memory
const blogPosts = [
  {
    id: '1',
    title: 'Top Tips for Student Productivity',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Proin in ipsum ac nisi placerat lobortis at sed lectus...`
  },
  {
    id: '2',
    title: 'Effective Note-Taking Techniques',
    content: `Vivamus fermentum, magna vel pulvinar convallis, purus dui 
    vestibulum nulla, ac gravida erat urna at lectus...`
  },
  {
    id: '3',
    title: 'Balancing Work and Study',
    content: `Fusce eget orci ac elit varius ultricies ac non nulla. 
    Donec in diam at risus hendrerit feugiat. Integer in leo...`
  }
];

// GET /blog => Show a list of all blog posts
router.get('/', (req, res) => {
  // Pass currentUser so Layout sees if user is logged in
  res.render('blog/BlogIndex', {
    blogPosts,
    currentUser: res.locals.currentUser
  });
});

// GET /blog/:id => Show a single blog post
router.get('/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).send('Blog post not found');
  }
  res.render('blog/BlogShow', {
    post,
    currentUser: res.locals.currentUser
  });
});

module.exports = router;
