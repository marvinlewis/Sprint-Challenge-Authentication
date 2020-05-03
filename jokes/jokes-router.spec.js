const request = require('supertest');
const server = require('../api/server');

describe('jokes-router.js', () => {
    it('should return a 401 status code on a unauthorized request', async () => {
        const expectedStatusCode = 401;
        const response = await request(server).get('/api/jokes');
  
        expect(response.status).toEqual(expectedStatusCode);

      });
  
      it('should return a JSON object containing a error message', async () => {
        const expectedBody = { you: 'shall not pass!' };
  
        const response = await request(server).get('/api/jokes');
  
        expect(response.body).toEqual(expectedBody);
      });
    });
