const mongoose = require('mongoose');
require('../mongodb_helper');
const Entry = require('../../models/entry');


describe('Entry model', () => {
    beforeEach(async () => {
        await Entry.deleteMany({});
    });
    afterAll(async () => {
      await  mongoose.connection.close();
    });

    it('has a title', () => {
        const entry = new Entry({
            title: 'Sunny day',
            input: 'When I woke up today morning the sum was shinning',
            date: '2023-04-13T12:42:23.086Z'
        });
        expect(entry.title).toEqual('Sunny day');
    });
    it('has an input', () => {
        const entry = new Entry({
            title: 'Sunny day',
            input: 'When I woke up today morning the sum was shinning',
            date: '2023-04-13T12:42:23.086Z'
        });
        expect(entry.input).toEqual('When I woke up today morning the sum was shinning');
    });
    it('can list all diary entries', async () => {
        const entries = await Entry.find().exec();
        expect(entries).toEqual([]);
    }); 
})