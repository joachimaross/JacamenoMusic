import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class APIService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Auth
  async register(email, password, username) {
    const response = await this.client.post('/auth/register', {
      email,
      password,
      username,
    });
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  async login(email, password) {
    const response = await this.client.post('/auth/login', { email, password });
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  // Studio
  async createProject(data) {
    const response = await this.client.post('/studio/projects', data);
    return response.data;
  }

  async getProjects() {
    const response = await this.client.get('/studio/projects');
    return response.data;
  }

  async addTrack(projectId, data) {
    const response = await this.client.post(`/studio/projects/${projectId}/tracks`, data);
    return response.data;
  }

  async exportProject(projectId, format, quality) {
    const response = await this.client.post(`/studio/projects/${projectId}/export`, {
      format,
      quality,
    });
    return response.data;
  }

  // AI Services
  async mixMaster(tracks, preferences) {
    const response = await this.client.post('/ai/mix-master', {
      tracks,
      preferences,
    });
    return response.data;
  }

  async getSongwritingSuggestions(prompt, genre, mood, structure) {
    const response = await this.client.post('/ai/songwriting', {
      prompt,
      genre,
      mood,
      structure,
    });
    return response.data;
  }

  async getVocalCoaching(audioUrl, targetStyle) {
    const response = await this.client.post('/ai/vocal-coach', {
      audioUrl,
      targetStyle,
    });
    return response.data;
  }

  async generateMusic(prompt, duration, style) {
    const response = await this.client.post('/ai/generate-music', {
      prompt,
      duration,
      style,
    });
    return response.data;
  }

  async generateVideo(audioUrl, style, prompt) {
    const response = await this.client.post('/ai/generate-video', {
      audioUrl,
      style,
      prompt,
    });
    return response.data;
  }

  // Collaboration
  async createCollaborationSession(projectId, collaborators, permissions) {
    const response = await this.client.post('/collaboration/sessions', {
      projectId,
      collaborators,
      permissions,
    });
    return response.data;
  }

  async getCollaborationSessions() {
    const response = await this.client.get('/collaboration/sessions');
    return response.data;
  }

  async joinSession(sessionId) {
    const response = await this.client.post(`/collaboration/sessions/${sessionId}/join`);
    return response.data;
  }

  async getCollaborationSuggestions() {
    const response = await this.client.get('/collaboration/suggestions');
    return response.data;
  }

  // Streaming
  async uploadTrack(data) {
    const response = await this.client.post('/streaming/upload', data);
    return response.data;
  }

  async getMyTracks() {
    const response = await this.client.get('/streaming/my-tracks');
    return response.data;
  }

  async streamTrack(trackId) {
    const response = await this.client.get(`/streaming/play/${trackId}`);
    return response.data;
  }

  async searchTracks(query, genre, artist) {
    const response = await this.client.get('/streaming/search', {
      params: { query, genre, artist },
    });
    return response.data;
  }

  async createPlaylist(name, description, tracks, isPublic) {
    const response = await this.client.post('/streaming/playlists', {
      name,
      description,
      tracks,
      isPublic,
    });
    return response.data;
  }

  async syncSpotify(accessToken) {
    const response = await this.client.post('/streaming/integrations/spotify/sync', {
      accessToken,
    });
    return response.data;
  }

  async syncAppleMusic(developerToken, musicUserToken) {
    const response = await this.client.post('/streaming/integrations/apple-music/sync', {
      developerToken,
      musicUserToken,
    });
    return response.data;
  }

  // Analytics
  async getUserAnalytics() {
    const response = await this.client.get('/analytics/user');
    return response.data;
  }

  async getTrackAnalytics(trackId) {
    const response = await this.client.get(`/analytics/track/${trackId}`);
    return response.data;
  }

  async getCollaborationAnalytics(sessionId) {
    const response = await this.client.get(`/analytics/collaboration/${sessionId}`);
    return response.data;
  }

  // Fan Portal
  async createArtistProfile(data) {
    const response = await this.client.post('/fan-portal/profile', data);
    return response.data;
  }

  async getArtistProfile(userId) {
    const response = await this.client.get(`/fan-portal/profile/${userId}`);
    return response.data;
  }

  async followArtist(userId) {
    const response = await this.client.post(`/fan-portal/profile/${userId}/follow`);
    return response.data;
  }

  async postUpdate(content, media, type) {
    const response = await this.client.post('/fan-portal/updates', {
      content,
      media,
      type,
    });
    return response.data;
  }

  async getFeed() {
    const response = await this.client.get('/fan-portal/feed');
    return response.data;
  }

  async setupMonetization() {
    const response = await this.client.post('/fan-portal/monetization/setup');
    return response.data;
  }

  async createSubscriptionTier(name, price, benefits) {
    const response = await this.client.post('/fan-portal/monetization/tiers', {
      name,
      price,
      benefits,
    });
    return response.data;
  }
}

export default new APIService();
