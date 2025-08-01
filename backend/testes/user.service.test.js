const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const expect = chai.expect

const userService = require('../services/userService');
const user = require('../models/UserSchema');

let mongoServer; 

describe('User Service (avec Mocha)', () => {
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri())
    });
    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
    beforeEach(async () => {
        await UserActivation.deleteMany()
    });
    it('doit crée un user', async () => {
        const user = await userService.createUser({
            name: 'Ilhan',
            email: 'ilhan@ilhan.com',
            password: '1234'
        })
        expect(user).to.have.property('name', 'Ilhan');
        expect(user).to.have.property('email', 'ilhan@ilhan.com');
        expect(user).to.have.property('password', '1234');
    });
    it('doit retourner tous les users', async () => {
        //crée 2 fake donnée de user pour pouvoir les lires
        await userService.createUser({ name: 'A', email: 'a@a.com', password: '123' });
        await userService.createUser({ name: 'B', email: 'b@b.com', password: '123456' });

        const users = await userService.getAllUsers();
        //expect() je veux tester cet objet .to.have.lengthOff qui coit contenir 2 objet
        expect(users).to.have.lengthOf(2);
    })
})