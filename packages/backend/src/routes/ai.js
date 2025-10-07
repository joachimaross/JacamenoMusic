const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// AI Mixing & Mastering
router.post('/mix-master', auth, async (req, res, next) => {
  try {
    const { projectId, tracks, preferences } = req.body;
    
    // Call AI service
    const response = await axios.post(`${AI_SERVICE_URL}/api/mix-master`, {
      tracks,
      preferences: preferences || {
        genre: 'auto',
        intensity: 'medium',
        targetLoudness: -14
      }
    });
    
    res.json({
      message: 'AI mixing/mastering completed',
      result: response.data
    });
  } catch (error) {
    next(error);
  }
});

// AI Songwriting Assistant
router.post('/songwriting', auth, async (req, res, next) => {
  try {
    const { prompt, genre, mood, structure } = req.body;
    
    const response = await axios.post(`${AI_SERVICE_URL}/api/songwriting`, {
      prompt,
      genre,
      mood,
      structure: structure || ['verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus']
    });
    
    res.json({
      message: 'Songwriting suggestions generated',
      suggestions: response.data
    });
  } catch (error) {
    next(error);
  }
});

// AI Vocal Coaching
router.post('/vocal-coach', auth, async (req, res, next) => {
  try {
    const { audioUrl, targetStyle } = req.body;
    
    const response = await axios.post(`${AI_SERVICE_URL}/api/vocal-coach`, {
      audioUrl,
      targetStyle
    });
    
    res.json({
      message: 'Vocal analysis completed',
      feedback: response.data
    });
  } catch (error) {
    next(error);
  }
});

// AI Music Generation (Suno integration)
router.post('/generate-music', auth, async (req, res, next) => {
  try {
    const { prompt, duration, style } = req.body;
    
    // Would integrate with Suno API
    res.json({
      message: 'Music generation started',
      jobId: Date.now(),
      status: 'processing',
      estimatedTime: 30
    });
  } catch (error) {
    next(error);
  }
});

// AI Video Generation (Kaiber integration)
router.post('/generate-video', auth, async (req, res, next) => {
  try {
    const { audioUrl, style, prompt } = req.body;
    
    // Would integrate with Kaiber API
    res.json({
      message: 'Video generation started',
      jobId: Date.now(),
      status: 'processing',
      estimatedTime: 120
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
