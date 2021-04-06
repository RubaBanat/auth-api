'use strict';

const server = require('../../../src/server').server;
const supergoose = require('@code-fellows/supergoose');
const bearer = require('../../../src/auth/middleware/bearer');


const request = supergoose(server);

let dataCollection = {
    clothes: {
        router: 'clothes',
        data: {
            name: 'T-shirt',
            color: 'black',
            size: 'small',
        },
        update: {
            name: 'T-shirt',
            color: 'white',
            size: 'small',
        },
    },
    food: {
        router: 'food',
        data: {
            name: 'apple',
            calories: '95',
            type: 'fruit',
        },
        update: {
            name: 'cucumber',
            calories: '95',
            type: 'vegetables',
        },
    },

};
let token;
let id;

describe('api/v2 server', () => {
    it('create admin and get the token', async () => {
        const response = await request.post('/signup').send({ username: 'admin', password: 'password', role: 'admin' });
        const userObj = response.body;
        token = userObj.token;
        console.log("consoloooooooo",userObj);
        expect(response.status).toBe(201);
        expect(userObj.token).toBeDefined();
        expect(userObj.user._id).toBeDefined();
    });
    Object.keys(dataCollection).forEach(type => {
        describe(`${type} dataCollection `, () => {

            it('should be able to create on POST ', async () => {

                const response = await request.post(`/api/v2/${dataCollection[type].router}`).set('Authorization', `Bearer ${token}`).send(dataCollection[type].data);
                expect(response.status).toEqual(201);
                expect(response.body.name).toEqual(dataCollection[type].data.name);
                id = response.body._id;
            });
            it('should be able to get  ', async () => {
                const response = await request.get(`/api/v2/${dataCollection[type].router}`).set('Authorization', `Bearer ${token}`);
                expect(response.status).toEqual(200);
            });
            it('should be able to update on PUT ', async () => {
                const response = await request.put(`/api/v2/${dataCollection[type].router}/${id}`).set('Authorization', `Bearer ${token}`).send(dataCollection[type].data);
                expect(response.status).toEqual(200);
                expect(response.body.name).toEqual(dataCollection[type].data.name);
            });
            it('should be able to get on Get /model/:id', async () => {
                const response = await request.get(`/api/v2/${dataCollection[type].router}/${id}`).set('Authorization', `Bearer ${token}`);
                expect(response.status).toEqual(200);
                expect(response.body.name).toEqual(dataCollection[type].data.name);
            });
            it(`should delete on DELETE /model/:id `, async () => {
                const response = await request.delete(`/api/v2/${dataCollection[type].router}/${id}`).set('Authorization', `Bearer ${token}`);
                expect(response.status).toEqual(200);
            });
        })
    })
})
