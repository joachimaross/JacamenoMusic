// Jest setup file for testing environment
/* eslint-env jest */
require('@testing-library/jest-dom');

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';
process.env.NEXT_PUBLIC_WS_URL = 'ws://localhost:4000';
process.env.NEXT_PUBLIC_AI_SERVICE_URL = 'http://localhost:8000';
