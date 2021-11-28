import { app } from '../../../app/app'
import { agent } from 'supertest'
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const BASE_URL = '/api/'
const params: {
    [index: string]: string,
    from: string,
    to: string,
    amount: string
} = {
    from: 'COP',
    to: 'USD',
    amount: '4000'
}
const SINGLE_QUERY = Object.keys(params).map(key => {
    return key + '=' + params[key]
}).join('&');

const MULTI_QUERY = ''

describe('Converter Controller', () => {
    it('The endpoint is enabled', async () => {
        const response = await agent(app).get(`${BASE_URL}convert`)

        expect(response.ok)
        expect(response.header['content-type']).toEqual('application/json; charset=utf-8')
    })

    describe('Without a date', () => {
        it('Should do a simple conversion', async () => {
            const response = await agent(app).get(`${BASE_URL}convert?${SINGLE_QUERY}`)

            expect(Object.keys(response.body['result']).length).toEqual(2)
        })

        // it('Should do a multiple conversion', async () => {
        //     const response = await agent(app).get(`${BASE_URL}multi-convert?${MULTI_QUERY}`)
        //
        //     expect(Object.keys(response.body['result']).length).toEqual(2)
        // })
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
