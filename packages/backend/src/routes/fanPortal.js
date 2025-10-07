const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Create artist profile
router.post('/profile', auth, async (req, res, next) => {
  try {
    const { bio, profileImage, socialLinks, genres } = req.body;
    
    const profile = {
      userId: req.user.id,
      bio,
      profileImage,
      socialLinks,
      genres,
      followers: 0,
      verified: false,
      createdAt: new Date()
    };
    
    res.status(201).json({
      message: 'Artist profile created',
      profile
    });
  } catch (error) {
    next(error);
  }
});

// Get artist profile
router.get('/profile/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const profile = {
      userId,
      username: 'Artist',
      bio: '',
      followers: 0,
      tracks: [],
      playlists: []
    };
    
    res.json({ profile });
  } catch (error) {
    next(error);
  }
});

// Follow artist
router.post('/profile/:userId/follow', auth, async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    res.json({
      message: 'Successfully followed artist',
      userId
    });
  } catch (error) {
    next(error);
  }
});

// Post update
router.post('/updates', auth, async (req, res, next) => {
  try {
    const { content, media, type } = req.body;
    
    const update = {
      id: Date.now(),
      userId: req.user.id,
      content,
      media,
      type, // text, image, video, audio
      likes: 0,
      comments: [],
      createdAt: new Date()
    };
    
    res.status(201).json({
      message: 'Update posted',
      update
    });
  } catch (error) {
    next(error);
  }
});

// Get updates feed
router.get('/feed', auth, async (req, res, next) => {
  try {
    const updates = []; // Would fetch from database
    res.json({ updates });
  } catch (error) {
    next(error);
  }
});

// Monetization - Setup Stripe
router.post('/monetization/setup', auth, async (req, res, next) => {
  try {
    // Would integrate with Stripe Connect
    res.json({
      message: 'Stripe setup initiated',
      setupUrl: 'https://connect.stripe.com/setup'
    });
  } catch (error) {
    next(error);
  }
});

// Create subscription tier
router.post('/monetization/tiers', auth, async (req, res, next) => {
  try {
    const { name, price, benefits } = req.body;
    
    const tier = {
      id: Date.now(),
      artistId: req.user.id,
      name,
      price,
      benefits,
      subscriberCount: 0
    };
    
    res.status(201).json({
      message: 'Subscription tier created',
      tier
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
