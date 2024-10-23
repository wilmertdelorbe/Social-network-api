const { Schema, model } = require('mongoose');
const feedbackSchema = require('./Feedback');
const dateFormat = require('../utils/timeStampFormatter');

// Schema for my main Idea model
const ideaSchema = new Schema(
  {
    ideaContent: {
      type: String,
      required: 'Every idea needs some explanation!',
      minlength: 1,
      maxlength: 280 // Keeping ideas Twitter-length for brevity
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp) // Using my custom date formatter
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    feedback: [feedbackSchema] // Array of feedback subdocuments
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// Virtual to count the number of feedback on an idea
ideaSchema.virtual('feedbackCount').get(function() {
  return this.feedback.length;
});

const Idea = model('Idea', ideaSchema);

module.exports = Idea;