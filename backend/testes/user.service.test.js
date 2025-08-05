const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const expect = chai.expect;

const userService = require('../services/userService');
const User = require('../models/UserSchema');

let mongoServer;

describe('User Service (avec Mocha)', function () {
    this.timeout(10000); // ← important pour MongoMemoryServer parfois un peu lent

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await User.deleteMany();
    });

    describe('Création de user', () => {
        it('doit créer un user avec succès', async () => {
            const userData = {
                alias: 'alias1',
                userName: 'user1',
                email: 'user1@example.com',
                password: 'password123',
                dateOfBirth: new Date('2000-01-01')
            };

            const user = await userService.createUser(userData);
            console.log('User créé :', user);

            expect(user).to.have.property('_id');
            expect(user.email).to.equal(userData.email);
        });

        const requiredFields = ['alias', 'userName', 'email', 'password', 'dateOfBirth'];
        requiredFields.forEach((field) => {
            it(`doit retourner une erreur si le champ ${field} est manquant`, async () => {
                const userData = {
                    alias: 'alias2',
                    userName: 'user2',
                    email: 'test@test.com',
                    password: 'password123',
                    dateOfBirth: new Date('2000-01-01')
                };

                delete userData[field];

                try {
                    await userService.createUser(userData);
                    throw new Error("Erreur : le user a été créé alors qu'il manque un champ");
                } catch (err) {
                    console.log('Erreur attendue :', err.message);
                    expect(err).to.exist;
                    expect(err.errors).to.have.property(field);
                }
            });
        });
        const uniqueFields = ['alias', 'userName', 'email']
        uniqueFields.forEach((field) => {
            it(`doit retourner un erreur si un champs unique ${field} existe deja`, async () => {
                const userData = {
                    alias: 'ilhan13',
                    userName: 'ilhan1315',
                    email: 'ilhan13@ilhan.com',
                    password: '12345',
                    dateOfBirth: new Date('2000-01-01')
                };
                await userService.createUser(userData);
                const newUserData = {
                    alias: 'ilhan13',
                    userName: 'ilhan1315',
                    email: 'ilhan13@ilhan.com',
                    password: '1315',
                    dateOfBirth: new Date('2000-01-01')
                };
                if (field !== 'alias') newUserData.alias = 'vivaLaMara';
                if (field !== 'userName') newUserData.userName = 'christobal';
                if (field !== 'email') newUserData.email = 'elbinkso@mara.com';
                try {
                    await userService.createUser(newUserData)
                    throw new Error(`Erreur : un utilisateur avec le meme ${field} a été créé`);
                } catch (err) {
                    console.log("Erreur attendue :", err.message)
                    expect(err).to.exist;
                    expect(err.code).to.equal(11000);
                }
            });
        });
    });
});


