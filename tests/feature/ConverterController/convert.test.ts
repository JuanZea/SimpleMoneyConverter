import { app } from '../../../app/app'
import { agent } from 'supertest'
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const BASE_URL = '/api/'
const FROM = 'COP'
const TO = 'USD'
const AMOUNT = '4000'

describe('Converter Controller', () => {
    it('The endpoint is enabled', async () => {
        const response = await agent(app).get(`${BASE_URL}convert`)

        expect(response.ok)
        expect(response.header['content-type']).toEqual('application/json; charset=utf-8')
    })

    describe('Without a date', () => {
        it('Should do a simple conversion', async () => {
            const response = await agent(app).get(`${BASE_URL}convert/${FROM}/${TO}/${AMOUNT}`)
            expect(Object.keys(response.body).length).toEqual(2)
        })

        it('Should not do a simple conversion with invalid data', async () => {
            let response = await agent(app).get(`${BASE_URL}convert/${undefined}/${TO}/${AMOUNT}`)
            expect(response.body).toEqual({"message": "The 'from' currency is invalid or not supported"})

            response = await agent(app).get(`${BASE_URL}convert/${FROM}/${undefined}/${AMOUNT}`)
            expect(response.body).toEqual({"message": "The 'to' currency is invalid or not supported"})

            response = await agent(app).get(`${BASE_URL}convert/${FROM}/${TO}/${undefined}`)
            expect(response.body).toEqual({"message": "The 'amount' param is required"})

            response = await agent(app).get(`${BASE_URL}convert/${FROM}/${TO}/${-5}`)
            expect(response.body).toEqual({"message": "The amount must be positive"})

            response = await agent(app).get(`${BASE_URL}convert/${FROM}/${TO}`)
            expect(response.body).toEqual({"message": "The 'amount' param is required"})

            response = await agent(app).get(`${BASE_URL}convert/${FROM}`)
            expect(response.body).toEqual({"message": "The 'to' param is required"})

            response = await agent(app).get(`${BASE_URL}convert`)
            expect(response.body).toEqual({"message": "The 'from' param is required"})
        })

        it('Should do a multiple conversion', async () => {
            const response = await agent(app)
                .post(`${BASE_URL}multi-convert`)
                .send({
                    requests: [
                        {
                            "from": 'COP',
                            "to": 'MXN',
                            "amount": 10000
                        },
                        {
                            "from": 'CLP',
                            "to": 'USD',
                            "amount": 15000
                        },
                        {
                            "from": 'ARS',
                            "to": 'BOB',
                            "amount": 800
                        }
                    ]
                })

            expect(Object.keys(response.body['results']).length).toEqual(3)
            expect(Object.keys(response.body['results'][0]).length).toEqual(2)
        })

        it('Should not do a multiple conversion with invalid data', async () => {
            let response = await agent(app).post(`${BASE_URL}multi-convert`)
                .send({
                    requests: [
                        {
                            "to": 'MXN',
                            "amount": 10000
                        },
                        {
                            "from": 'CLP',
                            "amount": 15000
                        },
                        {
                            "from": 'ARS',
                            "to": 'BOB',
                        },
                        {
                            "from": 'undefined',
                            "to": 'BOB',
                            "amount": 800
                        },
                        {
                            "from": 'COP',
                            "to": 'undefined',
                            "amount": 800
                        },
                        {
                            "from": 'COP',
                            "to": 'USD',
                            "amount": -8
                        },
                        {
                            "from": 'COP',
                            "to": 'MXN',
                            "amount": 'undefined'
                        }
                    ]
                })

            expect(Object.keys(response.body['results']).length).toEqual(7)
            expect(response.body['results'][0]).toEqual({"message": "The 'from' param is required"})
            expect(response.body['results'][1]).toEqual({"message": "The 'to' param is required"})
            expect(response.body['results'][2]).toEqual({"message": "The 'amount' param is required"})
            expect(response.body['results'][3]).toEqual({"message": "The 'from' currency is invalid or not supported"})
            expect(response.body['results'][4]).toEqual({"message": "The 'to' currency is invalid or not supported"})
            expect(response.body['results'][5]).toEqual({"message": "The amount must be positive"})
            expect(response.body['results'][6]).toEqual({"message": "The 'amount' param is required"})
        })
    })

    // describe('Using a date', () => {
    //     it('Should do a simple conversion', async () => {
    //         const response = await agent(app).get(`${BASE_URL}convert?${SINGLE_QUERY}&date=01-29-2000`)
    //
    //         expect(response.body).toMatchSchema({
    //             properties: {
    //                 result: {
    //                     type: 'object',
    //                 },
    //             },
    //             required: ['result'],
    //         })
    //     })
    // })

});
