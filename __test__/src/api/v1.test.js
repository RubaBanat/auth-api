
'use strict';

const server = require('../../../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');


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


let id;

describe('api/v1 server', () => {
    Object.keys(dataCollection).forEach(type => {
        describe(`${type} dataCollection `, () => {

            it('should be able to create on POST ', async () => {

                const response = await request.post(`/api/v1/${dataCollection[type].router}`).send(dataCollection[type].data);
                expect(response.status).toEqual(201);
                expect(response.body.name).toEqual(dataCollection[type].data.name);
                id = response.body._id;
            });
            it('should be able to get  ', async () => {
                const response = await request.get(`/api/v1/${dataCollection[type].router}`);
                expect(response.status).toEqual(200);
            });
            it('should be able to update on PUT ', async () => {
              const response = await request.put(`/api/v1/${dataCollection[type].router}/${id}`).send(dataCollection[type].data);
              expect(response.status).toEqual(200);
              expect(response.body.name).toEqual(dataCollection[type].data.name);
            });
            it('should be able to get on Get /model/:id', async () => {
              const response = await request.get(`/api/v1/${dataCollection[type].router}/${id}`);
              expect(response.status).toEqual(200);
              expect(response.body.name).toEqual(dataCollection[type].data.name);
            });
            it(`should delete a clothes on DELETE / clothes`, async () => {
              const response = await request.delete(`/api/v1/${dataCollection[type].router}/${id}`);
              expect(response.status).toEqual(200);
            });
            })
        })
    })
