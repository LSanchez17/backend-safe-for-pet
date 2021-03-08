const request = require('supertest');
const app = require('..app/');
const db = require('../db');

test('404 Works', async () => {
    const resp = await request(app).get('/no-path-exists');
    expect(resp.statusCode).toEqual(404);
});

afterAll(() => {
    db.end();
})