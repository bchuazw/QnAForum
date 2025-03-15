const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  createdAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Answer', AnswerSchema);
