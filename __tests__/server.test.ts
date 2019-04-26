import request from 'supertest';
import server from '../src/server';

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(server).get('/').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});
