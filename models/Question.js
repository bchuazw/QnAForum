const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body:  { type: String, required: true },
  tags:  [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual to count answers
QuestionSchema.virtual('answersCount', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'question',
  count: true
});

module.exports = mongoose.model('Question', QuestionSchema);
