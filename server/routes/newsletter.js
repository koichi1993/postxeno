const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// POST /newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already subscribed' });

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve subscribers' });
  }
});

// DELETE /newsletter/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Newsletter.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting subscriber' });
  }
});


module.exports = router;
