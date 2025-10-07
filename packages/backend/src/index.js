const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studioRoutes = require('./routes/studio');
const aiRoutes = require('./routes/ai');
const collaborationRoutes = require('./routes/collaboration');
const streamingRoutes = require('./routes/streaming');
const analyticsRoutes = require('./routes/analytics');
const fanPortalRoutes = require('./routes/fanPortal');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'JACAMENO Backend' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/studio', studioRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/streaming', streamingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/fan-portal', fanPortalRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 JACAMENO Backend running on port ${PORT}`);
});

module.exports = app;
