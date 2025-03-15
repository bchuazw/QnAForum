// models/Question.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  voters: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vote: { type: Number } // 1 for upvote, -1 for downvote
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for counting answers quickly (if needed)
QuestionSchema.virtual('answersCount', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'question',
  count: true
});

module.exports = mongoose.model('Question', QuestionSchema);
