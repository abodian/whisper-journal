const request = require('supertest');
const app = require('../../server');
require('../mongodb_helper');
const Entry = require('../../models/entry');
var mongoose = require('mongoose');

describe('/entry', () => {
  beforeEach(async () => {
    await Entry.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
 

  describe('POST, when title and input are provided', () => {
    test('the response code is 201', async () => {
      let response = await request(app)
        .post('/entry')
        .send({ title: 'Sunny day', input: 'I woke up and it was sunny', date: new Date() });
      expect(response.statusCode).toBe(201);
    });

    test('an entry is created', async () => {
      await request(app)
        .post('/entry')
        .send({ title: 'Sunny day', input: 'I woke up and it was sunny', date: new Date() });
      let entry = await Entry.find();
      let newEntry = entry[entry.length - 1];
      expect(newEntry.title).toEqual('Sunny day');
    });
  });

  describe('POST, when title is missing', () => {
    test('response code is 400', async () => {
      let response = await request(app)
        .post('/entry')
        .send({ input: 'I woke up and it was sunny', date: new Date() });
      expect(response.statusCode).toBe(400);
    });

    test('does not create an entry', async () => {
      await request(app).post('/entry').send({ input: 'I woke up and it was sunny', date: new Date() });
      let entry = await Entry.find();
      expect(entry.length).toEqual(0);
    });
  });

  describe('POST, when input is missing', () => {
    test('response code is 400', async () => {
      let response = await request(app)
        .post('/entry')
        .send({ title: 'Sunny day', date: new Date() });
      expect(response.statusCode).toBe(400);
    });

    test('does not create an entry', async () => {
      await request(app).post('/entry').send({ title: 'Sunny day' });
      let entry = await Entry.find();
      expect(entry.length).toEqual(0);
    });
  });

});