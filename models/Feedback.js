const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/timeStampFormatter');

// I'm creating a schema for feedback on concepts
// This will be a subdocument in the Concept model
const feedbackSchema = new Schema(
  {
    feedbackId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId() // Auto-generates a new ObjectId
    },
    feedbackText: {
      type: String,
      required: true,
      maxlength: 280 // Keeping feedback concise
    },
    contributor: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp) // Using my custom date formatter
    }
  },
  {
    toJSON: {
      getters: true // This ensures the getter for createdAt is used when the document is converted to JSON
    },
    id: false // This stops Mongoose from creating another `id` field
  }
);

module.exports = feedbackSchema;