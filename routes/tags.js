// routes/tags.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /tags
// Gathers all distinct tags from questions, calculates usage counts, and passes them to the TagsIndex view.
router.get('/', async (req, res) => {
  try {
    // 1. Get all distinct tag names
    const distinctTags = await Question.distinct('tags');

    // 2. For each tag, count how many questions use it
    const tagsData = [];
    for (const tagName of distinctTags) {
      const usageCount = await Question.countDocuments({ tags: tagName });
      const description = `Placeholder: A short description for ${tagName}.`;

      tagsData.push({
        name: tagName,
        usageCount,
        description
      });
    }

    // Sort tags by usageCount descending
    tagsData.sort((a, b) => b.usageCount - a.usageCount);

    // Render the page and pass currentUser so the layout shows the correct navbar
    res.render('tags/TagsIndex', {
      tagsData,
      currentUser: res.locals.currentUser
    });
  } catch (err) {
    console.error('Error fetching tags:', err);
    res.status(500).send('Error fetching tags');
  }
});

module.exports = router;
