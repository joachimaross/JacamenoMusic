const request = require('supertest');
const app = require('./index');

describe('Backend API Tests', () => {
  describe('Health Check', () => {
    it('should return 200 and status ok', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.service).toBe('JACAMENO Backend');
    });
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should login a user', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });

  describe('Studio API', () => {
    let authToken;

    beforeAll(async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      authToken = loginResponse.body.token;
    });

    it('should create a new project', async () => {
      const projectData = {
        name: 'Test Project',
        template: 'electronic',
        bpm: 128,
        key: 'Am',
      };

      const response = await request(app)
        .post('/api/studio/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send(projectData);

      expect(response.status).toBe(201);
      expect(response.body.project).toBeDefined();
      expect(response.body.project.name).toBe(projectData.name);
    });
  });
});
