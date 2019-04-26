import request from 'supertest';
import server from '../../src/server';

describe('Test the /users path', () => {
  // GET
  test('It should response the GET method', (done) => {
    request(server).get('/users').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
  // POST

});

describe('Test the /users/:id path', () => {
  // GET
  test('It should response the GET method', (done) => {
    request(server).get('/users/3').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
  // POST

});

describe('Test the /users/:id/name path', () => {
  // GET
  test('It should response the GET method', (done) => {
    request(server).get('/users/3/name').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
  // POST

});
