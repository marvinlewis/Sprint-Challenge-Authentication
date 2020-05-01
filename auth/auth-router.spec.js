const request = require('supertest');
const server = require('../api/server');

describe('auth-router.js', () => {
    it('should return a 400 status code for an unregistered user', async () => {
        const expectedStatusCode = 400;
        const response = await request(server).post('/api/auth/login').send({
            username : 'mj',
            password : '123'
        });
  
        expect(response.status).toEqual(expectedStatusCode);

      });
  
      it('should return a status code of 500 when missing a required field', async () => {
        const body = { you: 'shall not pass!' };
  
        const response = await request(server).post('/api/auth/register').send(body);
  
        expect(response.status).toEqual(500);
      });
    });