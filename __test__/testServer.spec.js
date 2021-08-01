const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

describe("Test the endpoint", () => {
    test("get method", done => { 
    request.get("/data")
    .then(response => {
        expect(response.status).toBe(200);
        done();
    });
   });
  });