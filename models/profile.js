const { Schema, model } = require('mongoose');
const formatTimeStamp = require('../utils/timeStampFormatter');

// Schema for user profiles in my innovative social platform
const profileSchema = new Schema(
  {
    handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    bio: {
      type: String,
      maxlength: 160,
      default: ''
    },
    ideas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Idea',
      },
    ],
    connections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatTimeStamp(timestamp)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// Virtual to calculate the profile's influence score
profileSchema.virtual('influenceScore').get(function () {
  return this.ideas.length * 5 + this.connections.length * 2;
});

// Virtual to get the total number of ideas and connections
profileSchema.virtual('activitySummary').get(function () {
  return {
    ideaCount: this.ideas.length,
    connectionCount: this.connections.length
  };
});

// Instance method to add a new connection
profileSchema.methods.addConnection = function(profileId) {
  if (!this.connections.includes(profileId)) {
    this.connections.push(profileId);
  }
  return this.save();
};

// Static method to find profiles by tag
profileSchema.statics.findByTag = function(tag) {
  return this.find({ tags: tag });
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;