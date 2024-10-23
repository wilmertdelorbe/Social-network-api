const { Idea, Profile } = require('../models');

const ideaOperations = {
  // Retrieve all ideas
  async fetchAllIdeas(req, res) {
    try {
      const ideaCollection = await Idea.find().sort({ createdAt: -1 });
      res.json(ideaCollection);
    } catch (err) {
      console.error('Error fetching ideas:', err);
      res.status(500).json({ message: 'Failed to retrieve ideas' });
    }
  },

  // Retrieve a single idea by id
  async fetchIdeaById(req, res) {
    try {
      const singleIdea = await Idea.findById(req.params.ideaId);
      if (!singleIdea) {
        return res.status(404).json({ message: 'Idea not found' });
      }
      res.json(singleIdea);
    } catch (err) {
      console.error('Error fetching idea:', err);
      res.status(500).json({ message: 'Failed to retrieve idea' });
    }
  },

  // Create a new idea
  async generateIdea(req, res) {
    try {
      const profile = await Profile.findById(req.body.creator);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      const newIdea = await Idea.create(req.body);
      profile.ideas.push(newIdea._id);
      await profile.save();

      res.status(201).json({ message: 'Idea successfully generated', idea: newIdea });
    } catch (err) {
      console.error('Error creating idea:', err);
      res.status(500).json({ message: 'Failed to generate idea', error: err.message });
    }
  },

  // Update an existing idea
  async modifyIdea(req, res) {
    try {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.ideaId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedIdea) {
        return res.status(404).json({ message: 'Idea not found' });
      }
      res.json(updatedIdea);
    } catch (err) {
      console.error('Error updating idea:', err);
      res.status(500).json({ message: 'Failed to update idea' });
    }
  },

  // Delete an idea
  async removeIdea(req, res) {
    try {
      const deletedIdea = await Idea.findByIdAndDelete(req.params.ideaId);
      if (!deletedIdea) {
        return res.status(404).json({ message: 'Idea not found' });
      }
      await Profile.findByIdAndUpdate(
        deletedIdea.creator,
        { $pull: { ideas: req.params.ideaId } }
      );
      res.json({ message: 'Idea successfully removed' });
    } catch (err) {
      console.error('Error deleting idea:', err);
      res.status(500).json({ message: 'Failed to remove idea' });
    }
  },

  // Add feedback to an idea
  async addFeedbackToIdea(req, res) {
    try {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.ideaId,
        { $push: { feedback: req.body } },
        { new: true, runValidators: true }
      );
      if (!updatedIdea) {
        return res.status(404).json({ message: 'Idea not found' });
      }
      res.json(updatedIdea);
    } catch (err) {
      console.error('Error adding feedback:', err);
      res.status(500).json({ message: 'Failed to add feedback' });
    }
  },

  // Remove feedback from an idea
  async removeFeedbackFromIdea(req, res) {
    try {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.ideaId,
        { $pull: { feedback: { feedbackId: req.params.feedbackId } } },
        { new: true }
      );
      if (!updatedIdea) {
        return res.status(404).json({ message: 'Idea not found' });
      }
      res.json(updatedIdea);
    } catch (err) {
      console.error('Error removing feedback:', err);
      res.status(500).json({ message: 'Failed to remove feedback' });
    }
  },
};

module.exports = ideaOperations;