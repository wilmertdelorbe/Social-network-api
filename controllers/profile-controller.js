const { Profile, Idea } = require('../models');

const profileOperations = {
  // Retrieve all profiles
  async fetchAllProfiles(req, res) {
    try {
      const profileCollection = await Profile.find().select('-__v');
      res.json(profileCollection);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      res.status(500).json({ message: 'Failed to retrieve profiles' });
    }
  },

  // Retrieve a single profile by id
  async fetchProfileById(req, res) {
    try {
      const singleProfile = await Profile.findById(req.params.profileId)
        .select('-__v')
        .populate('connections')
        .populate('ideas');

      if (!singleProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(singleProfile);
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ message: 'Failed to retrieve profile' });
    }
  },

  // Create a new profile
  async createProfile(req, res) {
    try {
      const existingProfile = await Profile.findOne({ handle: req.body.handle });
      if (existingProfile) {
        return res.status(400).json({ message: 'A profile with this handle already exists' });
      }
      const newProfile = await Profile.create(req.body);
      res.status(201).json(newProfile);
    } catch (err) {
      console.error('Error creating profile:', err);
      res.status(400).json({ message: 'Failed to create profile', error: err.message });
    }
  },

  // Update an existing profile
  async updateProfile(req, res) {
    try {
      const updatedProfile = await Profile.findByIdAndUpdate(
        req.params.profileId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(updatedProfile);
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  },

  // Delete a profile and associated ideas
  async removeProfile(req, res) {
    try {
      const deletedProfile = await Profile.findByIdAndDelete(req.params.profileId);
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      await Idea.deleteMany({ _id: { $in: deletedProfile.ideas } });
      res.json({ message: 'Profile and associated ideas successfully removed' });
    } catch (err) {
      console.error('Error deleting profile:', err);
      res.status(500).json({ message: 'Failed to remove profile' });
    }
  },

  // Add a connection to profile's network
  async addConnection(req, res) {
    try {
      const profile = await Profile.findById(req.params.profileId);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      await profile.addConnection(req.params.connectionId);
      res.json(profile);
    } catch (err) {
      console.error('Error adding connection:', err);
      res.status(500).json({ message: 'Failed to add connection' });
    }
  },

  // Remove a connection from profile's network
  async removeConnection(req, res) {
    try {
      const updatedProfile = await Profile.findByIdAndUpdate(
        req.params.profileId,
        { $pull: { connections: req.params.connectionId } },
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(updatedProfile);
    } catch (err) {
      console.error('Error removing connection:', err);
      res.status(500).json({ message: 'Failed to remove connection' });
    }
  },
};

module.exports = profileOperations;